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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Video from '@/partials/projects/project/Video';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
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
	const contributors = project.contributors.split("\n").map((contributor) => {
		const [firstName,lastName,classNumber,shirt, email, phoneNumber ] = contributor.split(";");
		return { name: firstName + " " + lastName, class: classNumber };
	})

	const links = {
		github: project.github ?? "",
		demo: project.demo ?? "",
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
		<div className="container pt-16 px-8 mb-20">
			<Card className="px-4 bg-black opacity-100 text-white w-[96%] m-auto md:w-[90%] lg:w-[70%] border-stroke border">
			<CardHeader className="pt-10">
				<CardTitle className="text-center">{project.title}</CardTitle>
			</CardHeader>
			<CardContent className="my-4">
				<div className="overflow-hidden w-full m-auto rounded-xl border-white border-2">
				<Video
					name={project.title}
					video={
					"https://www.youtube.com/watch?v=OheemahsBsY&ab_channel=%D0%A2%D0%A3%D0%95%D0%A1"
					}
				/>
				</div>
				{project.description.length > 250 ? <ScrollArea className='my-4 text-md sm:text-lg h-[150px] overflow-y-scroll'>{project.description}</ScrollArea> : 
				<CardDescription className='my-4 text-md sm:text-lg'>{project.description}</CardDescription>}
				<Creators creators={contributors} />
			</CardContent>
		
			</Card>
			<div className="mt-4 mx-auto  w-[96%] m-auto md:w-[90%] lg:w-[70%]">
			<Gallery name={project.title} pictures={project.images.split(", ")} />
			</div>
			<LinksContainer links={links} />
		</div>
		</div>
	);
};

export default ProjectPage;


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