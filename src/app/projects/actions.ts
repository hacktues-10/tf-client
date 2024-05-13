import { promises as fs } from 'fs';
import path from 'path';

export const getProjectById = async (id: string) => {
	//get all projects
	const res = await getProjects();

	return res.find((project: any) => project.id === Number(id));
};

export type ProjectType = Exclude<Awaited<ReturnType<typeof getProjectById>>, undefined>;

export const getProjects = async () => {
	try {
		const filePath = path.join(process.cwd(), 'public', 'projects.json');
		const data = await fs.readFile(filePath, 'utf8');
		const projects = JSON.parse(data);
		return projects;
	} catch (err) {
		console.error('Error:', err);
		return [];
	}
};

export const getEmbeddedProjects = async () => {
	const res = await getProjects();
	return res.filter((project: any) => project.type === 'Хардуер');
};

export const getSoftwareProjects = async () => {
	const res = await getProjects();
	console.log('res', res.length);
	const a = res.filter((project: any) => project.type === 'Софтуер');
	console.log(a.length);
	return a;
};

export const getNetworkinProjects = async () => {
	const res = await getProjects();
	return res.filter((project: any) => project.type === 'Компютърни мрежи');
};

export const getBotsProjects = async () => {
	const res = await getProjects();
	return res.filter((project: any) => project.type === 'Battle Bots');
};
