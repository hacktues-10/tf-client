import { NextRequest, NextResponse } from 'next/server';
import { CheckAuthenticationResponse } from '@/app/api/checkAuthentication/route';

export async function middleware(request: NextRequest) {
	const baseUrl = request.nextUrl.origin;
	const cookieHeader = request.headers.get('cookie');
	const credentials = cookieHeader ? 'include' : 'same-origin';
	const response = await fetch(`${baseUrl}/api/checkAuthentication`, {
		credentials,
		headers: cookieHeader ? { cookie: cookieHeader } : {},
	});

	const { hasSession } = (await response.json()) as CheckAuthenticationResponse;

	if (!hasSession) {
		return NextResponse.redirect(`${baseUrl}/login`);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/register', '/register/:id/edit'],
};
