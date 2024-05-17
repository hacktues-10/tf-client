import { unstable_cache } from 'next/cache';
import CATEGORY from '@/constants/projects/CATEGORY';
import { eq } from 'drizzle-orm';

import { db } from '../db';
import { projects } from '../db/schema';

export const getProjectById = async (id: number) => {
	return (await db.select().from(projects).where(eq(projects.id, id))).at(0);
};

export type ProjectType = Exclude<Awaited<ReturnType<typeof getProjectById>>, undefined>;

export const getProjects = unstable_cache(
	async () => {
		return db.select().from(projects);
	},
	['all-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);

export const getProjectsByCategory = unstable_cache(
	async (category: (typeof CATEGORY)[keyof typeof CATEGORY]) => {
		return db.select().from(projects).where(eq(projects.type, category));
	},
	['projects-by-category'],
	{
		revalidate: 20 * 60 * 1000,
	}
);
