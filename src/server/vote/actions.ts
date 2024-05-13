'use server';

import { headers } from 'next/headers';
import { getServerSideGrowthBook } from '@/app/_integrations/growthbook/growthbook';
import { db } from '@/app/db';
import { voters, votes } from '@/app/db/schema';
import { getProjects } from '@/app/projects/actions';
import { sendVoteEmail } from '@/server/vote/email';
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

const MAX_PROJECT_VOTES = 3;

export async function saveVote(data: z.infer<typeof submitVoteSchema>) {
	const gb = await getServerSideGrowthBook();
	if (gb.isOff('tf-vote-projects')) {
		return {
			success: false,
			error: 'Гласуването е затворено.',
		} as const;
	}

	const res = submitVoteSchema.safeParse(data);
	if (!res.success) {
		return {
			success: false,
			error: 'Невалидни данни.',
		} as const;
	}
	const input = res.data;

	// TODO: validate captcha
	const bitmap = decodeBitmap(input.pm).toString();

	const voteIds = projectMapStringToIds(bitmap);
	if (voteIds.length === 0) {
		return {
			success: false,
			error: 'Трябва да изберете поне един проект за гласуване.',
		} as const;
	} else if (voteIds.length > MAX_PROJECT_VOTES) {
		return {
			success: false,
			error: `Можете да гласувате за най-много ${MAX_PROJECT_VOTES} проекта.`,
		} as const;
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

	const votedProjects = voteIds.map((id) => {
		const result = projects.find((project: any) => project.id === id);
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
	invariant(typeof existingVoter !== 'undefined' && existingVoter !== null, 'Voter not created');

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

	if (!existingVoter.isVerified) {
		await sendVoteEmail(existingVoter, votedProjects);
	}

	return {
		success: true,
	} as const;
}
