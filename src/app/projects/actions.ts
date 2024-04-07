import { unstable_cache } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from '../db';
import { projects } from '../db/schema';

export const getProjectById = async (id: number) => {
	return (await db.select().from(projects).where(eq(projects.id, id))).at(0);
};

export const getProjects = unstable_cache(
	async () => {
		return await db.select().from(projects);
	},
	['all-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);

export const getEmbeddedProjects = unstable_cache(
	async () => {
		return await db.select().from(projects).where(eq(projects.type, 'Хардуер'));
	},
	['embedded-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);

export const getSoftwareProjects = unstable_cache(
	async () => {
		return await db.select().from(projects).where(eq(projects.type, 'Софтуер'));
	},
	['software-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);

export const getNetworkinProjects = unstable_cache(
	async () => {
		return await db.select().from(projects).where(eq(projects.type, 'Компютърни мрежи'));
	},
	['networking-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);

export const getBotsProjects = unstable_cache(
	async () => {
		return await db.select().from(projects).where(eq(projects.type, 'Battle Bots'));
	},
	['bots-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);
