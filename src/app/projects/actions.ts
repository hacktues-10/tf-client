import { promises as fs } from 'fs';

export const getProjectById = async (id: string) => {
	//get all projects
	const res = await getProjects();

	return res.find((project: any) => project.id === Number(id));
};

export const getProjects = async () => {
	try {
		// Read the file with fs.promises.readFile which returns a promise
		const data = await fs.readFile('./projects.json', 'utf8'); // Correctly using await with promises
		// Parse the JSON data
		const projects = JSON.parse(data);
		return projects;
	} catch (err) {
		// Handle errors (both from readFile and JSON.parse)
		console.error('Error:', err);
		return []; // Return an empty array or rethrow the error depending on your use case
	}
};

export const getEmbeddedProjects = async () => {
	const res = await getProjects();
	return res.filter((project: any) => project.type === 'Хардуер');
};

export const getSoftwareProjects = async () => {
	const res = await getProjects();
	return res.filter((project: any) => project.type === 'Софтуер');
};

export const getNetworkinProjects = async () => {
	const res = await getProjects();
	return res.filter((project: any) => project.type === 'Компютърни мрежи');
};

export const getBotsProjects = async () => {
	const res = await getProjects();
	return res.filter((project: any) => project.type === 'Battle Bots');
};
