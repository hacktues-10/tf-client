import { db } from '@/app/db';
import { voters } from '@/app/db/schema';
import { arrayBufferToHex, hexToArrayBuffer } from '@/utils/hex';
import { eq } from 'drizzle-orm';

import { env } from '../../../env.mjs';

const secret = crypto.subtle.importKey(
	'raw',
	new TextEncoder().encode(env.NEXT_AUTH_SECRET),
	{ name: 'HMAC', hash: 'SHA-256' },
	false,
	['sign', 'verify']
);

export async function generateToken(voterId: string, expires: number) {
	const data = `${voterId}.${expires}`;
	const signature = await crypto.subtle.sign('HMAC', await secret, new TextEncoder().encode(data));
	return `${data}.${arrayBufferToHex(signature)}`;
}

export async function verifyToken(token: string) {
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

	return voterId;
}

export async function parseToken(token: string) {
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
