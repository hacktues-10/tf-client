import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db';
import { projectsSubmission } from '@/app/db/schema';
import { count } from 'drizzle-orm';

export async function GET(req: NextRequest) {
	const results = await db.select({ count: count(projectsSubmission.id) }).from(projectsSubmission);
	if (results[0]) {
		return new NextResponse(results[0].count.toString());
	}
	return new NextResponse('0');
}
