import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IfTfFeatureOff, IfTfFeatureOn } from '@/app/_integrations/growthbook/components';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import ProjectsLoading from '@/partials/projects/loader/ProjectsLoading';
import Projects from '@/partials/projects/Projects';
import { getPublicR2Url } from '@/utils/r2Public';
import { BsYoutube } from 'react-icons/bs';
import { FaYoutube, FaYoutubeSquare } from 'react-icons/fa';

import NotFound from '../not-found';
import { getProjects } from './actions';

const PATH: {
	name: string;
	url: string;
}[] = [
	{
		name: 'TUES Fest 2024',
		url: '/',
	},
	{
		name: 'Проекти',
		url: '',
	},
];

const TABS = [
	{
		text: 'Всички',
		href: '/projects',
	},
	{
		text: 'Хардуер',
		href: '/projects/category/embedded',
	},
	{
		text: 'Софтуер',
		href: '/projects/category/software',
	},
	{
		text: 'Battle Bots',
		href: '/projects/category/battlebot',
	},
	{
		text: 'Мрежи',
		href: '/projects/category/networks',
	},
];

const LinkTab = ({ text, href, current }: { text: string; href: string; current: boolean }) => (
	<Link
		href={href}
		className={`inline-flex items-center justify-center whitespace-nowrap rounded-md ${
			current ? 'border border-white' : 'bg-[#353444]'
		} px-5 py-[10px] text-base font-semibold text-white transition-all hover:bg-primary`}
	>
		{text}
	</Link>
);

const ProjectsPage = async () => {
	const projects = await getProjects();
	//shuffle projects
	projects.sort(() => Math.random() - 0.5);

	return (
		<>
			<IfTfFeatureOn feature="tf-projects">
				<div className="container">
					<ProjectsPath path={PATH} />
					<div className="mb-28">
						<section className="pt-8">
							<div className="m-auto sm:mx-4">
								<Card className="m-4 mb-14 rounded-lg border-2 border-stroke bg-black px-5 py-4 text-white opacity-100">
									<div className="z-50 -mx-4 flex flex-wrap items-center justify-between">
										<div className="w-full px-4">
											<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
												{TABS.map((tab) => (
													<LinkTab key={tab.href} {...tab} current={tab.text === 'Всички'} />
												))}
											</div>
										</div>
									</div>
								</Card>
							</div>
						</section>
						<div className="inline-grid w-full grid-cols-1 sm:m-4 md:grid-cols-2 lg:grid-cols-3">
							{projects ? (
								projects.map((project) => <Project key={project.title} project={project} />)
							) : (
								<div>Loading...</div>
							)}
						</div>
					</div>
				</div>
			</IfTfFeatureOn>
			<IfTfFeatureOff feature="tf-projects">
				<NotFound />
			</IfTfFeatureOff>
		</>
	);
};

const Project = ({ project }: { project: Awaited<ReturnType<typeof getProjects>>[number] }) => {
	return (
		<Card className="z-20 m-4 max-w-[500px] bg-black text-white opacity-100">
			<div className="relative mx-auto mt-4 w-[90%]" style={{ paddingTop: '56.25%' }}>
				<Image
					key={project.id}
					src={getPublicR2Url(project.thumbnail == '' ? project.images.split(', ')[0] : project.thumbnail)}
					alt={project.title}
					className="absolute left-0 top-0 rounded-lg object-cover"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<CardHeader className="flex flex-row items-center justify-between">
				<Link
					className="text-xl font-semibold hover:cursor-pointer hover:text-sand"
					href={`/projects/${project.id}`}
				>
					{project.title}
				</Link>
				{project.youtubeId && (
					<YoutubeLink
						href={`https://www.youtube.com/watch?v=${encodeURIComponent(project.youtubeId ?? '')}`}
					/>
				)}
			</CardHeader>
		</Card>
	);
};

const YoutubeLink = ({ href }: { href: string }) => {
	return (
		<div className="m-1 rounded-lg p-1 duration-100 hover:scale-110 hover:text-error">
			<Link href={href}>
				<FaYoutube size={32} />
			</Link>
		</div>
	);
};

export default ProjectsPage;
