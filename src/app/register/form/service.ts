'use server';
import { RegistrationSchema } from './schema';

import { env } from '../../../../env.mjs';

export async function RegisterProject(data: RegistrationSchema) {
	console.log(data);
	const allContributors = await fetch('http://localhost:1337/api/tests-asd', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${env.API_TOKEN_BACKEND}`,
		},
	})
		.then((response) => response.json())
		.then((data) => console.log('Adasdad', JSON.stringify(data)))
		.catch((error) => console.error('Error:', error));

	console.log('INFO', allContributors);
}
