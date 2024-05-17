import { unstable_cache } from 'next/cache';
import CATEGORY from '@/constants/projects/CATEGORY';
import { eq } from 'drizzle-orm';
import invariant from 'tiny-invariant';

import { db } from '../db';
import { projects } from '../db/schema';

function convertProject(project: {
	contributors: string;
	images: string;
	type: 'Софтуер' | 'Хардуер' | 'Battle Bots' | 'Компютърни мрежи' | null;
	id: number;
	title: string;
	penokarton: string | null;
	demo: string | null;
	description: string;
	github: string;
	thumbnail: string;
	video: string;
	youtubeId: string | null;
	submissionId: number | null;
}) {
	const contributors = project.contributors.split('\n').map((contributor) => {
		const [firstName, lastName, classNumber, ,] = contributor.split(';');
		return { name: firstName + ' ' + lastName, class: classNumber };
	});
	invariant(project.type !== null);
	return {
		id: project.id,
		title: project.title,
		category: Object.keys(CATEGORY).find((key) => CATEGORY[key as keyof typeof CATEGORY] === project.type)!,
		description: project.description,
		thumbnail: project.thumbnail,
		images: project.images.split(', '),
		links: {
			repoUrls: project.github.split(', '),
			demoUrl: project.demo,
		},
		youtubeId: project.youtubeId,
		contributors,
	};
}

export const getProjectById = async (id: number) => {
	const project = (await db.select().from(projects).where(eq(projects.id, id))).at(0);
	if (!project) return null;
	return convertProject(project);
};

export type ProjectType = Exclude<Awaited<ReturnType<typeof getProjectById>>, null>;

export const getProjects = unstable_cache(
	async () => {
		return db
			.select()
			.from(projects)
			.then((ps) => ps.map(convertProject));
	},
	['all-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);

export const getProjectsByCategory = unstable_cache(
	async (category: (typeof CATEGORY)[keyof typeof CATEGORY]) => {
		return db
			.select()
			.from(projects)
			.where(eq(projects.type, category))
			.then((ps) => ps.map(convertProject));
	},
	['projects-by-category'],
	{
		revalidate: 20 * 60 * 1000,
	}
);
