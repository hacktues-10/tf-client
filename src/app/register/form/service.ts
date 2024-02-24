'use server';
import { RegistrationSchema } from './schema';

import { env } from '../../../../env.mjs';

export async function RegisterProject(data: RegistrationSchema) {
	const imagesString = data.images.join(', ');

	const formData = {
		title: data.title,
		description: data.description,
		github: data.github,
		images: imagesString,
		video: data.video,
		captain: `${data.firstName} ${data.lastName} ${data.grade}${data.parallel} ${data.email} ${data.phoneNumber}`,
	};

	const res = await fetch('http://localhost:1337/api/projects', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.API_TOKEN_BACKEND}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: formData }),
	})
		.then((response) => response.json())
		.then((data) => console.log('Adasdad', JSON.stringify(data)))
		.catch((error) => console.error('Error:', error));
}
