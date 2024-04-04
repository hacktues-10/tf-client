import { Suspense } from 'react';
import Link from 'next/link';
import { IfTfFeatureOff, IfTfFeatureOn } from '@/app/_integrations/growthbook/components';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import ProjectsLoading from '@/partials/projects/loader/ProjectsLoading';
import Projects from '@/partials/projects/Projects';

import NotFound from '../not-found';
import { getProjects } from './actions';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { BsYoutube } from 'react-icons/bs';
import { FaYoutube, FaYoutubeSquare } from 'react-icons/fa';
import Image from 'next/image';

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

	return (
		<>
			<IfTfFeatureOn feature="tf-projects">
				<div className="container">
					<ProjectsPath path={PATH} />
					<div className="">
						<section className="pt-8">
							<div className="m-auto sm:mx-4">
								<Card className='opacity-100 bg-black text-white m-4 mb-14 rounded-lg border-2 border-stroke px-5 py-4'>
									<div className="-mx-4 flex z-50 flex-wrap items-center justify-between">
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
						<div className='w-full sm:m-4 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
						{projects ? projects.map((project) => <Project key={project.title} project={project}/>) : <div>Loading...</div>}
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


const Project = ({project} :{project: Awaited<ReturnType<typeof getProjects>>[number]}) => {
	return <Card className='max-w-[500px] opacity-100 bg-black text-white m-4'>
    <div className='relative w-[90%] mx-auto mt-4' style={{ paddingTop: '56.25%' }}>
	<Image 
  src={`https://pub-40c3b6cf3326458d9e34b64cd71f902c.r2.dev/${project.thumbnail == "" ? project.images.split(", ")[0] : project.thumbnail}`} 
  alt={project.title}
  className='absolute top-0 left-0 object-cover rounded-lg'
  layout='fill'
  objectFit='cover'
/>
    </div>
    <CardHeader className='flex items-center flex-row justify-between'>
      <Link className='text-xl font-semibold hover:text-sand hover:cursor-pointer' href={`/projects/${project.id}`}>{project.title}</Link>
      <YoutubeLink href="/api"/>
    </CardHeader>
  </Card>}

const YoutubeLink = ({href} : {href: string}) => {
	return <div className='m-1 p-1 rounded-lg hover:text-error hover:scale-110 duration-100'>
		<Link href={href}>
	  <FaYoutube size={32}/>
  </Link>
  </div>}

export default ProjectsPage;
