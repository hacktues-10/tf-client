// IMPORTATN - THIS IS THE DUMBES SOLUTION, BUT I WANT SWEEEET SERVER COMPONENTS

import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import ProjectsLoading from '@/partials/projects/loader/ProjectsLoading';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { FaYoutube } from 'react-icons/fa';
import { getBotsProjects, getEmbeddedProjects, getNetworkinProjects, getProjects, getSoftwareProjects } from '../../actions';
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
		category: 'all',
		href: '/projects',
	},
	{
		text: 'Хардуер',
		category: 'embedded',
		href: '/projects/category/embedded',
	},
	{
		text: 'Софтуер',
		category: 'software',
		href: '/projects/category/software',
	},
	{
		text: 'Battle Bots',
		category: 'battlebot',
		href: '/projects/category/battlebot',
	},
	{
		text: 'Мрежи',
		category: 'networks',
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


const ProjectsPage =async ({
	params,
}: {
	params: {
		category: string;
	};
}) => {
	const { category } = params;

	console.log("sadasdas", category)

	// if category not in [software, embedded, battlebots, networks, all]
	// redirect to /projects

	if (!['software', 'embedded', 'battlebot', 'networks', 'all'].includes(category)) {
		redirect('/projects');
	}

	let projects;

	if (category == 'all'){
	projects = await getProjects();
	}else if(category == 'software'){
		projects = await getSoftwareProjects();
	}else if(category == 'embedded'){
		projects =await getEmbeddedProjects();
	}else if(category == 'networks'){
		projects = await getNetworkinProjects();
	}
	else if (category == "battlebot"){
		projects = await getBotsProjects();
	}


	projects?.sort(() => Math.random() - 0.5);

	return (
		<div className="container">
			<ProjectsPath path={PATH} />
			<div className="mb-28">
			<section className="pt-8">
							<div className="mx-4">
								<Card className='opacity-100 bg-black text-white m-4 mb-14 rounded-lg border-2 border-stroke px-5 py-4'>
									<div className="-mx-4 flex z-50 flex-wrap items-center justify-between">
										<div className="w-full px-4">
											<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
												{TABS.map((tab) => (
													<LinkTab key={tab.href} {...tab} current={tab.category === category} />
												))}
											</div>
										</div>
									</div>
								</Card>
							</div>
						</section>
				{/* <ErrorBoundary FallbackComponent={ProjectsError}> */}
				<Suspense fallback={<ProjectsLoading />}>
					<div className='w-full sm:m-4 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
						{projects ? projects.map((project) => <Project key={project.title} project={project}/>) : <div>Loading...</div>}
						</div>				</Suspense>
			</div>
		</div>
	);
};


const Project = ({project} :{project: Awaited<ReturnType<typeof getProjects>>[number]}) => {
	return <Card className='max-w-[500px] opacity-100 bg-black text-white m-4'>
    <div className='relative w-[90%] mx-auto mt-4' style={{ paddingTop: '56.25%' }}>
	<Image 
	key={project.id}
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
