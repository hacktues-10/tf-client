import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import Creators from '@/partials/projects/project/Creators';
import Description from '@/partials/projects/project/Description';
import Gallery from '@/partials/projects/project/Gallery';
import LinksContainer from '@/partials/projects/project/Links';
import MainInfo from '@/partials/projects/project/MainInfo';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { getProjectById } from '../actions';

export type Links = {
	github: string;
	demo: string;
};

export type Creator = {
	name: string;
	class: string;
};

export type Picture = {
	url: string;
	is_thumbnail: boolean;
};

export type Project = {
	id: number;
	name: string;
	description: string;
	video: string;
	type: string;
	category: string;
	has_thumbnail: boolean;
	links: Links;
	creators: Creator[];
	pictures: Picture[];
	next_id: number;
	prev_id: number;
};

const getProject = async (id: number) => {
	const project = getProjectById(id);

	return project;
};

// export async function generateMetadata({ params }: { params: { projectId: number } }) {
// 	const project = await getProject(params.projectId);

// 	const images = project.pictures?.map((picture) => ({
// 		url: picture.url,
// 		is_thumbnail: picture.is_thumbnail,
// 	}));

// 	// sort by is_thumbnail - true first
// 	images?.sort((a, b) => (a.is_thumbnail ? -1 : 1));

// 	// TODO: add more metadata + image - thumbnail or first picture
// 	return {
// 		title: project.name,
// 		description: project.description,
// 		twitter: {
// 			card: 'summary_large_image',
// 			title: `${project.name} | TUES Fest 2024`,
// 			description: project.description,
// 			creator: '@tuesfest',
// 			images: images?.map((image) => ({
// 				url: image.url,
// 			})),
// 		},
// 		openGraph: {
// 			title: `${project.name} | TUES Fest 2024`,
// 			description: project.description,
// 			url: `https://tuesfest.bg/projects/${project.id}`,
// 			siteName: 'TUES Fest 2024',
// 			images: images?.map((image) => ({
// 				url: image.url,
// 			})),
// 			locale: 'bg-BG',
// 			type: 'website',
// 		},
// 	};
// }

const ProjectPage = async ({ params }: { params: { projectId: number } }) => {
	const project = await getProjectById(params.projectId);

	if (project === undefined || project === null || project.id === 0) notFound();

	const path = [
		{
			name: 'TUES Fest 2024',
			url: '/',
		},
		{
			name: 'Проекти',
			url: '/projects',
		},
		{
			name: project.title,
			url: '',
		},
	];

	return (
		<div className="pb-8">
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectsPath path={path} />
			</Suspense>
			<h2>{project.title}</h2>
			{/* <div className="container flex flex-col items-center gap-4 pt-8">
				<MainInfo
					{...project}
					thumbnail={
						project.has_thumbnail
							? project.pictures?.find((picture) => picture.is_thumbnail)?.url ??
								project.pictures?.[0]?.url
							: project.pictures?.[0]?.url
					}
				/>
				<Gallery {...project} />
				<Description {...project} />
				<LinksContainer {...project} />
				<Creators {...project} />
			</div>
			<div className="fixed bottom-5 right-0 z-10 w-screen">
				<div className="container relative">
					<div className="absolute bottom-0 right-4 flex items-center justify-center gap-4">
						{project.prev_id !== undefined && project.prev_id !== 0 && (
							<Link
								href={`/projects/${project.prev_id}`}
								className="rounded-xl border border-border bg-bg-color bg-opacity-75 p-2 backdrop-blur-md hover:border-stroke  hover:bg-border"
							>
								<TbChevronLeft size={32} />
							</Link>
						)}
						{project.next_id !== undefined && project.next_id !== 0 && (
							<Link
								href={`/projects/${project.next_id}`}
								className="rounded-xl border border-border bg-bg-color bg-opacity-75 p-2 backdrop-blur-md hover:border-stroke hover:bg-border"
							>
								<TbChevronRight size={32} />
							</Link>
						)}
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default ProjectPage;
