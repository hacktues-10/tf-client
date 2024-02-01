import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

import Footer from '@/partials/layout/Footer';
import Navigation from '@/partials/layout/Navigation';

import 'animate.css';
import './globals.css';
import VoteProvider from '@/context/vote';
import VotingLayout from '@/partials/layout/Voting';
import { GrowthBookServerProvider } from '@/integrations/growthbook/GrowthBookServerProvider';
import { DayProvider } from '@/context/day';
export const metadata = {
	title: {
		default: 'TUES Fest 2024',
		template: '%s | TUES Fest 2024',
	},
	description:
		'TUES Fest 2024 - ден на отворените врати на ТУЕС и изложение на ученически проекти. София Тех Парк - 23 април 2024.',
	keywords: [
		'tues',
		'tues fest',
		'tues fest 2024',
		'tuesfest',
		'tuesfest 2024',
		'tuesfest.bg',
		'tuesfest.bg 2024',
		'tuesfest 2024',
		'туес',
		'технологично училище електронни системи',
		'програмиране',
		'бал',
		'училища след 7ми клас',
		'кандидатстване',
		'бал',
		'минимален бал',
		'бал 2024',
		'бал 2024 туес',
		'туес бал 2024',
		'туес бал',
		'туес бал 2024',
		'ту софия',
		'високоплатени работи',
		'проекти',
		'ученици',
		'джон атанасов',
		'туес фест',
		'туес фест 2024',
		'туес фест 2024 програма',
		'туес фест 2024 програма',
		'най-добрите ученици',
		'училища софия',
		'най-добри гимназии',
		'топ училища',
		'топ гимназии',
		'ден на отворените врати',
		'ден на отворените врати 2024',
		'ден на отворените врати 2024 туес',
		'туес ден на отворените врати',
		'туес ден на отворените врати 2024',
		'отворени врати',
		'отворени врати 2024',
		'отворени врати 2024 туес',
		'нво',
		'нво 2024',
		'нво 2024 туес',
		'матури',
		'матури 2024',
		'матури 7ми клас',
		'матури 7 клас',
		'кандидатстване 7 клас',
	],
	viewport: 'width=device-width, initial-scale=1',
	themeColor: '#141420',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.png',
		apple: '/favicon.png',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TUES Fest 2024',
		description:
			'TUES Fest 2024 - ден на отворените врати на ТУЕС и изложение на ученически проекти. София Тех Парк - 23 април 2024.',
		creator: '@tuesfest',
		images: ['https://tuesfest.bg/logo/motto.png'],
	},
	archives: ['https://2022.tuesfest.bg'],
	assets: ['https://tuesfest.bg/favicon.png', 'https://tuesfest.bg/logo/motto.png', 'https://tuesfest.bg/assets'],
	openGraph: {
		title: 'TUES Fest 2024',
		description:
			'TUES Fest 2024 - ден на отворените врати на ТУЕС и изложение на ученически проекти. София Тех Парк - 23 април 2024.',
		url: 'https://tuesfest.bg',
		siteName: 'TUES Fest 2024',
		images: [
			{
				url: 'https://tuesfest.bg/logo/motto.png',
			},
		],
		locale: 'bg-BG',
		type: 'website',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="bg">
			<head>
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-1H1H1CR559" strategy="afterInteractive" />
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-1H1H1CR559');
					`}
				</Script>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"></link>
			</head>
			<body className=" text-white">
				<div className="bg-repeat bg-[url(./bg.svg)]">
					<DayProvider>
						<Navigation />
						{/* <VoteProvider> */}
						{/*@ts-expect-error */}
						<GrowthBookServerProvider>{children}</GrowthBookServerProvider>

						{/* <VotingLayout /> */}
						{/* </VoteProvider> */}
						<Footer />
						<Analytics />
					</DayProvider>
				</div>
			</body>
		</html>
	);
}
