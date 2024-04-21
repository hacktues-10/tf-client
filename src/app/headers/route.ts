import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export default function GET(_: NextRequest) {
	return NextResponse.json(headers());
}
