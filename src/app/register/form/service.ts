'use server';

import { revalidatePath } from 'next/cache';
import { getServerSideGrowthBook } from '@/app/_integrations/growthbook/growthbook';
import { db } from '@/app/db';
import { projectsSubmission } from '@/app/db/schema';
import { getContributors } from '@/app/register/form/getContributors';
import { getImpersonationSession } from '@/app/register/form/getImpersonationSession';
import { eq } from 'drizzle-orm';

import type { RegistrationSchema, UpdateProjectSchema } from './schema';

export async function registerProject(data: RegistrationSchema) {
	const imagesString = data.files.images.join(', ');
	const contributorsString = getContributorsString(data);

	try {
		await db.insert(projectsSubmission).values({
			//@ts-ignore
			title: data.project.title,
			description: data.project.description,
			github: data.project.github,
			type: data.project.type,
			thumbnail: data.files.thumbnail,
			images: imagesString,
			video: data.files.video,
			contributors: contributorsString,
			penokarton: data.files.penokarton,
			demo: data.project.demo,
		});

		return { success: true, message: 'Проектът е регистриран успешно' };
	} catch (error: any) {
		console.error('Error:', error);
		return { success: false, message: 'Проект с това име вече съществува' };
	}
}

export async function getProjectSubmission(id: number) {
	const gb = await getServerSideGrowthBook();
	if (gb.isOff('tf-edit-projects')) {
		return null;
	}

	// const session = await getSession();
	const session = await getImpersonationSession();
	if (!session?.user?.email) {
		return null;
	}

	const results = await db.select().from(projectsSubmission).where(eq(projectsSubmission.id, id));
	const projectSubmission = results[0];
	if (!projectSubmission) {
		return null;
	}
	const contributors = getContributors(projectSubmission);
	const submitter = contributors[0];
	if (submitter?.email !== session.user.email) {
		return null;
	}

	return {
		id: projectSubmission.id,
		project: {
			title: projectSubmission.title,
			description: projectSubmission.description,
			github: projectSubmission.github,
			type: projectSubmission.type || undefined,
			demo: projectSubmission.demo || undefined,
		},
		contributors,
		files: {
			thumbnail: projectSubmission.thumbnail,
			images: projectSubmission.images.split(', '),
			video: projectSubmission.video,
			penokarton: projectSubmission.penokarton || undefined,
		},
	};
}

export type ProjectSubmission = Exclude<Awaited<ReturnType<typeof getProjectSubmission>>, null>;

export async function updateProjectSubmission(updateProjectPayload: UpdateProjectSchema) {
	console.log(updateProjectPayload);
	const projectSubmission = await getProjectSubmission(updateProjectPayload.id);
	if (!projectSubmission) {
		throw new Error('Project not found');
	}

	const imagesString = updateProjectPayload.files.images.join(', ');

	const contributorsString = getContributorsString(updateProjectPayload);

	await db
		.update(projectsSubmission)
		.set({
			title: updateProjectPayload.project.title,
			description: updateProjectPayload.project.description,
			github: updateProjectPayload.project.github,
			type: updateProjectPayload.project.type,
			thumbnail: updateProjectPayload.files.thumbnail,
			images: imagesString,
			video: updateProjectPayload.files.video,
			contributors: contributorsString,
			penokarton: updateProjectPayload.files.penokarton,
			demo: updateProjectPayload.project.demo,
		})
		.where(eq(projectsSubmission.id, updateProjectPayload.id));
	revalidatePath(`/register/${updateProjectPayload.id}/edit`);
}

function getContributorsString(data: RegistrationSchema) {
	let contributorsString = '';
	for (let i = 0; i < data.contributors.length; i++) {
		contributorsString += `${data.contributors[i].firstName};${data.contributors[i].lastName};${data.contributors[i].grade}${data.contributors[i].parallel};${data.contributors[i].tshirt};${data.contributors[i].email};'${data.contributors[i].phoneNumber}`;
		if (i < data.contributors.length - 1) {
			contributorsString += '\r\n';
		}
	}
	return contributorsString;
}
