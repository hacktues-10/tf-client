import { projects, voters } from '@/app/db/schema';
import { generateToken } from '@/server/vote/token';

import { env } from '../../../env.mjs';

export async function sendVoteEmail(
	voter: typeof voters.$inferSelect,
	votedProjects: (typeof projects.$inferSelect)[]
) {
	const token = await generateToken(voter.id, Date.now() + 1000 * 60 * 60);
	const baseUrl = 'https://tuesfest.bg';
	const url = `${baseUrl}/vote/${token}`;
	const subject = 'Потвърдете гласа си за TUES Fest 2024';
	const html = `<p>Здравейте, ${voter.name}!</p>
	
	<p>Благодарим ви, че гласувахте за вашите любими ученически проекти от TUES Fest 2024!</p>
	
	<p>Вие гласувахте за следните проекти:</p>
	
	<ul>
	${votedProjects.map((p) => `<li><b>${p.title}</b> <i>(Категория „${p.type}“)</i>`).join('\n')}
	</ul>
	
	<p>За да потвърдите гласа си, моля кликнете на следния линк: <a href="${url}">Потвърди моя глас</a></p>
	
	<p>Поздрави,</p>
	<p>Екипът на TUES Fest 2024</p>
	`;

	const mailgunApiKey = '0e51f5df62b9dde588b855e734b1e798-19806d14-7676795a';
	// const mailgunApiKey = '69abaf1cb36e9067e345b8751da32404-19806d14-a74ef52f';
	const mailgunDomain = 'mg1.tuesfest.bg';
	// const mailgunDomain = 'sandboxde7b443027114ef588091cf834f1d074.mailgun.org';
	const mailgunUrl = `https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`;
	// const mailgunUrl = `https://api.mailgun.net/v3/${mailgunDomain}/messages`;
	const mailgunFrom = 'noreply@tuesfest.bg';
	const mailgunResponse = await fetch(mailgunUrl, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			from: mailgunFrom,
			to: voter.email,
			subject,
			html,
		}).toString(),
	});

	if (!mailgunResponse.ok) {
		console.error(`Failed to send email: ${await mailgunResponse.text()}`);
		throw new Error('Failed to send email');
	}
}
