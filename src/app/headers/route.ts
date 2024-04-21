import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function GET(_: NextRequest) {
	const theHeaders = Array.from(headers().entries());
	return NextResponse.json(theHeaders);
}
