import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { authOptions } from './options';

export async function getSession() {
	const session = await getServerSession(authOptions);
	if (!session) return null;
	invariant(session.user !== undefined, 'User is missing from session');
	invariant(session.user.email, 'Email is missing from session');
	return session;
}

export type HTSession = Exclude<Awaited<ReturnType<typeof getSession>>, null>;

export function signInRedirect(): never {
	// TODO: redirect to current page in a better way
	// Next App router doesn't have an API for this yet
	// X-Invoke-Path is not documented, but it works
	// I don't feel good about this
	// https://stackoverflow.com/a/76585119
	const invokePath = headers().get('x-invoke-path');
	return redirect(
		`/api/auth/signin?${new URLSearchParams({
			callbackUrl: invokePath ?? '/',
		})}`
	);
}

export async function getUserAuthorization() {
	const session = await getSession();
	return {
		hasSession: !!session,
	};
}
