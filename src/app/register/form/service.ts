'use server';
import { RegistrationSchema } from './schema';

import { env } from '../../../../env.mjs';
import { db } from '@/app/db';
import { projectsSubmission } from '@/app/db/schema';

export async function RegisterProject(data: RegistrationSchema) {
	const imagesString = data.files.images.join(', ');

	let contributosString = '';
	for (let i = 0; i < data.contributors.length; i++) {
		contributosString += `${data.contributors[i].firstName};${data.contributors[i].lastName};${data.contributors[i].grade}${data.contributors[i].parallel};${data.contributors[i].tshirt};${data.contributors[i].email};'${data.contributors[i].phoneNumber}`;
		if (i < data.contributors.length - 1) {
			contributosString += '\r\n';
		}
	}

	try {
		const responseData = await db.insert(projectsSubmission).values({
			title: data.project.title,
			description: data.project.description,
			github: data.project.github,
			type: data.project.type,
			images: imagesString,
			video: data.files.video,
			contributors: contributosString,
		});

		return { success: true, message: 'Проектът е регистриран успешно' };
	} catch (error: any) {
		console.error('Error:', error);
		if (error.message === 'This attribute must be unique.') {
			return { success: false, message: 'Проект с това име вече съществува' };
		} else {
			return { success: false, message: `Възникна грешка ${error.message}` };
		}
	}
}
