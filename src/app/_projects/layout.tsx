export const metadata = {
	title: {
		default: 'Проекти',
		template: '%s | ТУЕС Фест 2024',
	},
	description:
		'Тук може да откриете проектите на учениците на ТУЕС. Тази година над 120 проекта ще бъдат представени само на 21 април в София Тех Парк - форум Джон Атанасов.',
	keywords: [
		'туес',
		'туес фест',
		'туес фест 2024',
		'туесфест',
		'туесфест 2024',
		'туесфест.bg',
		'проекти',
		'ученически проекти',
		'ученици',
		'ученически',
		'инициативи',
		'инициатива',
		'иновации',
		'иновативни',
		'училища',
		'училища софия',
		'училища българия',
		'програмиране',
		'програмиране за деца',
		'програмиране за ученици',
	],
	twitter: {
		card: 'summary_large_image',
		title: 'Проекти | ТУЕС Фест 2024',
		description:
			'Тук може да откриете проектите на учениците на ТУЕС. Тази година над 120 проекта ще бъдат представени само на 21 април в София Тех Парк - форум Джон Атанасов.',
		creator: '@tuesfest',
		images: ['https://tuesfest.bg/logo/motto.png'],
	},
	assets: ['https://tuesfest.bg/favicon.png', 'https://tuesfest.bg/logo/motto.png', 'https://tuesfest.bg/assets'],
	openGraph: {
		title: 'Проекти | TUES Fest 2024',
		description:
			'Тук може да откриете проектите на учениците на ТУЕС. Тази година над 120 проекта ще бъдат представени само на 21 април в София Тех Парк - форум Джон Атанасов.',
		url: `https://tuesfest.bg/projects`,
		siteName: 'TUES Fest 2024',
		images: ['https://tuesfest.bg/logo/motto.png'],
		locale: 'bg-BG',
		type: 'website',
	},
};

const ProjectsLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className="min-h-screen">{children}</div>;
};

export default ProjectsLayout;
