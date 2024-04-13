import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import Creators from '@/partials/projects/project/Creators';
import Description from '@/partials/projects/project/Description';
import Gallery from '@/partials/projects/project/Gallery';
import LinksContainer from '@/partials/projects/project/Links';
import MainInfo from '@/partials/projects/project/MainInfo';
import Video from '@/partials/projects/project/Video';
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

const getProject = async (id: number) => {
	const project = getProjectById(id);

	return project;
};

export async function generateMetadata({ params }: { params: { projectId: number } }) {
	const project = await getProjectById(params.projectId);

	if (project === undefined || project === null || project.id === 0) return;

	return {
		title: project.title,
		description: project.description,
		twitter: {
			card: 'summary_large_image',
			title: `${project.title} | TUES Fest 2024`,
			description: project.description,
			creator: '@tuesfest',
			images: project.images.split(', ').map((picture) => ({
				url: picture,
			})),
		},
		openGraph: {
			title: `${project.title} | TUES Fest 2024`,
			description: project.description,
			url: `https://tuesfest.bg/projects/${project.id}`,
			siteName: 'TUES Fest 2024',
			images: project.images.split(', ').map((picture) => ({
				url: picture,
			})),
			locale: 'bg-BG',
			type: 'website',
		},
	};
}

const ProjectPage = async ({ params }: { params: { projectId: number } }) => {
	const project = await getProjectById(params.projectId);

	if (project === undefined || project === null || project.id === 0) notFound();
	const contributors = project.contributors.split('\n').map((contributor) => {
		const [firstName, lastName, classNumber, shirt, email, phoneNumber] = contributor.split(';');
		return { name: firstName + ' ' + lastName, class: classNumber };
	});

	const links = {
		github: project.github ?? '',
		demo: project.demo ?? '',
	};
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
		<div className="container">
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectsPath path={path} />
			</Suspense>
			<div className="container mb-20 pt-16 sm:px-8">
				<Card className="m-auto w-full border border-stroke bg-black text-white opacity-100 sm:px-4 md:w-[90%] lg:w-[70%]">
					<CardHeader className="pt-10">
						<CardTitle className="text-center text-3xl">{project.title}</CardTitle>
					</CardHeader>
					<CardContent className="my-4">
						{project.youtubeId && (
							<div className="m-auto w-full overflow-hidden rounded-xl border-2 border-white">
								<Video name={project.title} id={project.youtubeId ?? ''} />
							</div>
						)}
						{!project.youtubeId && (
							<div
								className="relative m-auto w-full rounded-xl border-2 border-white"
								style={{ paddingTop: '56.25%' }}
							>
								<Image
									key={project.id}
									src={`https://pub-40c3b6cf3326458d9e34b64cd71f902c.r2.dev/${project.thumbnail == '' ? project.images.split(', ')[0] : project.thumbnail}`}
									alt={project.title}
									className="absolute left-0 top-0 rounded-lg object-cover"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						)}
						{project.description.length > 250 ? (
							<ScrollArea className="text-md my-4 h-[150px] overflow-y-scroll sm:text-lg">
								{project.description}
							</ScrollArea>
						) : (
							<CardDescription className="text-md my-6 sm:text-lg">{project.description}</CardDescription>
						)}
						<Creators creators={contributors} />
					</CardContent>
				</Card>
				<div className="m-auto mx-auto   mt-4 w-[96%] md:w-[90%] lg:w-[70%]">
					<Gallery name={project.title} pictures={project.images.split(', ')} />
				</div>
				<LinksContainer links={links} />
			</div>
		</div>
	);
};

export default ProjectPage;
