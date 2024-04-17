'use server';

import { headers } from 'next/headers';
import { db } from '@/app/db';
import { voters, votes } from '@/app/db/schema';
import { getProjects } from '@/app/projects/actions';
import { generateToken } from '@/server/vote/token';
import { arrayBufferToHex } from '@/utils/hex';
import {
	decodeBitmap,
	hasMultipleIntersections,
	projectIdsToMapString,
	projectMapStringToIds,
} from '@/utils/vote-projects-map';
import { eq } from 'drizzle-orm';
import invariant from 'tiny-invariant';
import { ulid } from 'ulid';
import { z } from 'zod';

import { env } from '../../../env.mjs';

const submitVoteSchema = z.object({
	email: z.string().email(),
	name: z.string().trim(),
	pm: z.string().trim(),
	cf: z.string().trim(),
	isSpam: z.literal(false),
});

export async function saveVote(data: z.infer<typeof submitVoteSchema>) {
	const input = submitVoteSchema.parse(data);
	// TODO: validate captcha
	const bitmap = decodeBitmap(input.pm).toString();

	const voteIds = projectMapStringToIds(bitmap);
	if (voteIds.length === 0) {
		throw new Error('Invalid vote');
	}

	const projects = await getProjects();
	const categoryMap = new Map<string, number[]>();
	for (const project of projects) {
		const category = project.type;
		if (!category) continue;
		if (!categoryMap.has(category)) {
			categoryMap.set(category, []);
		}
		categoryMap.get(category)!.push(project.id);
	}

	for (const ids of categoryMap.values()) {
		if (hasMultipleIntersections(bitmap, projectIdsToMapString(ids))) {
			throw new Error('Invalid vote');
		}
	}

	const votedProjects = voteIds.map((id) => {
		const result = projects.find((project) => project.id === id);
		if (!result) throw new Error('Invalid vote');
		return result;
	});

	const ipAddr = headers().get('x-forwarded-for');
	const ipHash = arrayBufferToHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ipAddr ?? '')));
	const emailHash = arrayBufferToHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.email)));

	let existingVoter = await db.query.voters.findFirst({
		where: eq(voters.emailHash, emailHash),
	});
	if (!existingVoter) {
		existingVoter = (
			await db
				.insert(voters)
				.values({
					id: ulid(),
					createIpHash: ipHash,
					email: input.email,
					name: input.name,
					emailHash,
				})
				.returning()
		)[0];
	}
	invariant(typeof existingVoter !== 'undefined');

	// delete existing votes
	await db.delete(votes).where(eq(votes.voterId, existingVoter.id));

	await db
		.insert(votes)
		.values(
			votedProjects.map((p) => ({
				voterId: existingVoter!.id,
				projectId: p.id,
				ipHash,
			}))
		)
		.returning();

	const token = await generateToken(existingVoter.id, Date.now() + 1000 * 60 * 60 * 24 * 7);

	const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

	// Send mail with mailgun
	const mailgunApiKey = '0e51f5df62b9dde588b855e734b1e798-19806d14-7676795a';
	const mailgunDomain = 'mg1.tuesfest.bg';
	const mailgunFrom = 'noreply@tuesfest.bg';
	const mailgunTo = input.email;
	const mailgunSubject = 'Потвърдете своя глас за TUES Fest 2024';
	const mailgunText = `<p>Здравейте, ${input.name}!</p>
	
	<p>Благодарим ви, че гласувахте за вашите любими ученически проекти от TUES Fest 2024!</p>
	
	<p>От всичките ${projects.length} проекта, които бяха представени, вие избрахте следните:</p>
	
	<ul>
	${votedProjects.map((p) => `<li><b>${p.title}</b> <i>(Категория „${p.type}“)</i>`).join('\n')}
	</ul>
	
	<p>За да потвърдите гласа си, моля кликнете на следния линк: <a href="${baseUrl}/vote/${token}">Потвърди гласа си</a></p>
	
	<p>Поздрави,</p>
	<p>Екипът на TUES Fest 2024</p>
	`;
	const mailgunUrl = `https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`;
	const mailgunResponse = await fetch(mailgunUrl, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			from: mailgunFrom,
			to: mailgunTo,
			subject: mailgunSubject,
			html: mailgunText,
		}).toString(),
	});

	return {
		success: true,
	};
}
