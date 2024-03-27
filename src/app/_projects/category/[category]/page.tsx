// IMPORTATN - THIS IS THE DUMBES SOLUTION, BUT I WANT SWEEEET SERVER COMPONENTS

import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import ProjectsLoading from '@/partials/projects/loader/ProjectsLoading';
import Projects from '@/partials/projects/Projects';

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
		href={href || '/'}
		className={`inline-flex items-center justify-center whitespace-nowrap rounded-md ${
			current ? 'bg-primary' : 'bg-[#353444]'
		} px-5 py-[10px] text-base font-semibold text-white transition-all hover:bg-primary`}
	>
		{text}
	</Link>
);

const ProjectsPage = ({
	params,
}: {
	params: {
		category: string;
	};
}) => {
	const { category } = params;

	// if category not in [software, embedded, battlebots, networks, all]
	// redirect to /projects

	if (!['software', 'embedded', 'battlebot', 'networks', 'all'].includes(category)) {
		redirect('/projects');
	}

	return (
		<div className="">
			<ProjectsPath path={PATH} />
			<div className="container">
				<section className="-mx-4 pt-8">
					<div className="container">
						<div className="mb-14 rounded-lg border-2 border-stroke px-5 py-4">
							<div className="-mx-4 flex flex-wrap items-center justify-between">
								<div className="w-full px-4">
									<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
										{TABS?.map((tab) => (
											<LinkTab
												key={tab.href}
												text={tab.text}
												href={tab.href}
												current={category === tab.category}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* <ErrorBoundary FallbackComponent={ProjectsError}> */}
				<Suspense fallback={<ProjectsLoading />}>
					{/* @ts-expect-error Server Component */}
					<Projects category={category} />
				</Suspense>
				{/* </ErrorBoundary> */}
			</div>
		</div>
	);
};

export default ProjectsPage;
