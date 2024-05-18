// IMPORTATN - THIS IS THE DUMBES SOLUTION, BUT I WANT SWEEEET SERVER COMPONENTS
import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import CATEGORY from '@/constants/projects/CATEGORY';
import CATEGORY_MAP from '@/constants/projects/CATEGORY_MAP';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import ProjectsLoading from '@/partials/projects/loader/ProjectsLoading';
import Project from '@/partials/projects/project/Project';

import { getProjectsByCategory } from '../../actions';

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
	CATEGORY_MAP.embedded,
	CATEGORY_MAP.software,
	CATEGORY_MAP.battlebot,
	{ ...CATEGORY_MAP.networks, text: 'Мрежи' },
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

export function generateStaticParams() {
	return Object.keys(CATEGORY).map((category) => ({
		category,
	}));
}

const ProjectsPage = async ({
	params,
}: {
	params: {
		category: string;
	};
}) => {
	const category = params.category.toString();

	if (!Object.hasOwn(CATEGORY, category)) {
		console.log(CATEGORY, category);
		redirect('/projects');
	}

	const projects = await getProjectsByCategory(CATEGORY[category as keyof typeof CATEGORY]);

	projects?.sort(() => Math.random() - 0.5);

	return (
		<div className="container">
			<ProjectsPath path={PATH} />
			<div className="mb-28">
				<section className="pt-8">
					<div className="mx-4">
						<Card className="m-4 mb-14 rounded-lg border-2 border-stroke bg-black px-5 py-4 text-white opacity-100">
							<div className="z-50 -mx-4 flex flex-wrap items-center justify-between">
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
					<div className="inline-grid w-full grid-cols-1 sm:m-4 md:grid-cols-2 lg:grid-cols-3">
						{projects ? (
							projects.map((project) => <Project key={project.title} project={project} />)
						) : (
							<div>Loading...</div>
						)}
					</div>{' '}
				</Suspense>
			</div>
		</div>
	);
};

export default ProjectsPage;
