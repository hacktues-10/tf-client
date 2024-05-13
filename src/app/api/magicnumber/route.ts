import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db';
import { projects, projectsSubmission, voters, votes } from '@/app/db/schema';
import { getPublicR2Url } from '@/utils/r2Public';
import { and, count, eq, not } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	const res = await db
		.select()
		.from(votes)
		.leftJoin(voters, eq(voters.id, votes.voterId))
		.leftJoin(projects, eq(projects.id, votes.projectId))
		.where(and(not(votes.isBlocked), voters.isVerified));
	const ids = new Map<number, { id: number; title: string; thumbnailUrl: string; coeff: number }>();
	for (const row of res) {
		if (!row.projects) continue;
		if (!ids.has(row.projects.id)) {
			ids.set(row.projects.id, {
				id: row.projects.id,
				title: row.projects.title,
				thumbnailUrl: row.projects.thumbnail
					? getPublicR2Url(row.projects.thumbnail)
					: getPublicR2Url(row.projects.images.split(', ')[0]),
				coeff: 0,
			});
		}
		ids.get(row.projects.id)!.coeff++;
	}
	for (const [youtubeId, value] of ids) {
		value.coeff /= res.length;
	}
	const videosToVote = Array.from(ids.values()).sort((a, b) => b.coeff - a.coeff);
	return NextResponse.json(videosToVote);
}
