import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function GET(_: NextRequest) {
	return NextResponse.json(headers());
}
