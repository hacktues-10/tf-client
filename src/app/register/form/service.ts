'use server';
import { RegistrationSchema } from './schema';

import { env } from '../../../../env.mjs';

export async function RegisterProject(data: RegistrationSchema) {
	const imagesString = data.images.join(', ');

	const formData = {
		title: data.title,
		description: data.description,
		github: data.github,
		type: data.type,
		images: imagesString,
		video: data.video,
		captain: `${data.firstName} ${data.lastName} ${data.grade}${data.parallel} ${data.email} ${data.phoneNumber}`,
	};

	try {
		const response = await fetch('http://localhost:1337/api/projects', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.API_TOKEN_BACKEND}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: formData }),
		});

		const responseData = await response.json();
		if (responseData.error) {
			if (responseData.error.message == 'This attribute must be unique') {
				return { success: false, message: 'Проект с това име вече съществува' };
			} else {
				return { success: false, message: `Възникна грешка ${responseData.error.message}` };
			}
		}
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
