import { notFound } from 'next/navigation';
import { db } from '@/app/db';
import { voters } from '@/app/db/schema';
import { hexToArrayBuffer } from '@/utils/hex';
import { eq } from 'drizzle-orm';

import { env } from '../../../../env.mjs';

export default async function VerifyVotePage({
	params: { token },
}: {
	params: {
		token: string;
	};
}) {
	const voter = await parseToken(token);
	if (!voter) {
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center text-center">
				<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">
					Този линк за гласуване е изтекъл или е невалиден.
					<br />
					Моля, опитайте отново.
				</h2>
			</div>
		);
	}

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center text-center">
			<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">
				Здравейте, {voter.name}!<br />
				Вие успешно потвърдихте своя глас.
			</h2>
		</div>
	);
}

async function parseToken(token: string) {
	const segments = token.split('.');
	if (segments.length !== 3) {
		console.error('Invalid token', token);
		return null;
	}

	const [voterId, expiresStr, signature] = segments;
	const expires = parseInt(expiresStr, 10);
	if (isNaN(expires)) {
		console.error('Invalid expires', expiresStr);
		return null;
	}
	if (expires < Date.now()) {
		console.error('Expired token', expires);
		return null;
	}

	const data = `${voterId}.${expiresStr}`;
	const valid = await crypto.subtle.verify(
		'HMAC',
		await secret,
		hexToArrayBuffer(signature),
		new TextEncoder().encode(data)
	);
	if (!valid) {
		console.error('Invalid signature', signature, 'for', data);
		return null;
	}

	const voter = db.query.voters.findFirst({
		where: eq(voters.id, voterId),
	});
	if (!voter) {
		console.error('Voter not found', voterId);
	}
	return voter;
}

const secret = crypto.subtle.importKey(
	'raw',
	new TextEncoder().encode(env.NEXT_AUTH_SECRET),
	{ name: 'HMAC', hash: 'SHA-256' },
	false,
	['verify']
);
