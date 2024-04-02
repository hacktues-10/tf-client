import { cache } from 'react';
import { db } from '@/app/db';
import { projectsSubmission } from '@/app/db/schema';
import { getContributors } from '@/app/register/form/getContributors';
import { getImpersonationSession } from '@/app/register/form/getImpersonationSession';
import { sql } from 'drizzle-orm';

export const getOwnSubmissions = cache(async () => {
	// const session = await getSession();
	const session = await getImpersonationSession();
	if (!session?.user?.email) {
		return [];
	}
	const results = await db.select().from(projectsSubmission).where(sql`${projectsSubmission.contributors} like '%;'||
        ${session.user.email}
        ||
        ';%'`);
	return results.filter((projectSubmission) => {
		const contributors = getContributors(projectSubmission);
		const submitter = contributors[0];
		return submitter?.email === session.user?.email;
	});
});
