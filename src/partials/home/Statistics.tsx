'use client';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { STATISTICS } from '@/info/statistics';
import { TbSTurnDown } from 'react-icons/tb';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';
import About from './About';
import { BsPeople } from 'react-icons/bs';
import { PiProjectorScreenChart } from 'react-icons/pi';
import { FaRegBuilding } from 'react-icons/fa';
import { GrAchievement } from 'react-icons/gr';
import './styles.css';
import { useState } from 'react';
import { FOLDERS } from '@/info/folders';
import { FaRegFolder } from 'react-icons/fa';
import { FaRegFolderOpen } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Statistics() {
	const [selectedFolder, setSelectedFolder] = useState(8);

	return (
		<div className="w-full rounded-xl bg-zinc bg-clip-padding backdrop-filter backdrop-blur-none sm:backdrop-blur-sm bg-opacity-40  block">
			<About />
			<div className="px-2 md:px-6 lg:px-10 xl:px-14 ">
				<h2 className="bg-gradient p-4 text-transparent font-black text-5xl bg-clip-text">
					ТУЕС Фест през годините
				</h2>
				<div className="block lg:flex w-full">
					<History selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />

					<div className="p-2 hidden lg:block w-full lg:w-1/3">
						{STATISTICS.map((statistic) => (
							<Card
								key={statistic.title}
								className={`my-4 pl-0 shadow-none pr-6 lg:p-6 pt-6 border-0 h-[300px] md:w-full lg:pr-10 text-white overflow-hidden bg-transparent rounded-xl`}
							>
								<div className="flex justify-center m-2">
									<HeaderIcon icon={statistic.icon} />
									<CardTitle className="ml-2">{statistic.title}</CardTitle>
								</div>
								<div className="bg-transparent">
									<BarStatistic selectedFolder={selectedFolder} data={statistic.data} />
								</div>
							</Card>
						))}
					</div>
					<div className="xl:hidden pt-28 pb-20">
						<ImagesContainer selectedFolder={selectedFolder} />
					</div>
					<ImagesContainer className="hidden xl:block" selectedFolder={selectedFolder} />
					<div className="p-2 block lg:hidden w-full lg:w-1/3">
						{STATISTICS.map((statistic) => (
							<Card
								key={statistic.title}
								className={`my-4 pl-0 shadow-none pr-6 lg:p-6 pt-6 border-0 h-[300px] md:w-full lg:pr-10 text-white overflow-hidden bg-black rounded-xl`}
							>
								<div className="flex justify-center m-2">
									<HeaderIcon icon={statistic.icon} />
									<CardTitle className="ml-2">{statistic.title}</CardTitle>
								</div>
								<div className="bg-black">
									<BarStatistic selectedFolder={selectedFolder} data={statistic.data} />
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function HeaderIcon({ icon }: { icon: string }) {
	switch (icon) {
		case 'TbSTurnDown':
			return <TbSTurnDown size={24} />;
		case 'BsPeople':
			return <BsPeople size={24} />;
		case 'PiProjectorScreenChart':
			return <PiProjectorScreenChart size={24} />;
		case 'FaRegBuilding':
			return <FaRegBuilding size={24} />;
		case 'GrAchievement':
			return <GrAchievement size={24} />;
		default:
			return null;
	}
}

function BarStatistic({
	selectedFolder,
	data,
}: {
	selectedFolder: number;
	data: {
		name: string;
		total: number;
	}[];
}) {
	const folder = FOLDERS.find((folder) => folder.id == selectedFolder);

	return (
		<ResponsiveContainer width="100%" className="my-6" height={200}>
			<BarChart data={data}>
				<XAxis dataKey="name" stroke="#fff" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="#fff"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Bar dataKey="total" radius={[4, 4, 0, 0]}>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={folder?.name == entry.name ? '#fbebb7' : 'currentColor'} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

function History({
	selectedFolder,
	setSelectedFolder,
}: {
	selectedFolder: number;
	setSelectedFolder: (id: number) => void;
}) {
	return (
		<div className="align-middle flex w-full lg:w-1/6 justify-center lg:mx-10">
			<div className="grid grid-cols-4 lg:grid-cols-2 gap-1 gap-y-0 h-2/3 my-auto">
				{FOLDERS.map((folder) => (
					<div
						className="p-5 hover:bg-gradient-to-br sm:hover:cursor-pointer sm:hover:from-primary sm:hover:to-secondary hover:shadow-lg rounded-xl"
						key={folder.id}
						onClick={() => setSelectedFolder(folder.id)}
					>
						<div className="w-[36px] md:w-[40px] lg:w-[56px]">
							{selectedFolder == folder.id ? (
								<FaRegFolderOpen size="100%" />
							) : (
								<FaRegFolder size="100%" />
							)}
						</div>
						<h1 className="text-xl">{folder.name}</h1>
					</div>
				))}
			</div>
		</div>
	);
}

function ImagesContainer({ selectedFolder, className }: { selectedFolder: number; className?: string | undefined }) {
	const folder = FOLDERS.find((folder) => folder.id == selectedFolder);
	const [isFirstImageVisible, setIsFirstImageVisible] = useState(false);
	const [isSecondImageVisible, setIsSecondImageVisible] = useState(false);

	useEffect(() => {
		setIsFirstImageVisible(false);
		setIsSecondImageVisible(false);

		const timer1 = setTimeout(() => {
			setIsFirstImageVisible(true);
		}, 300);

		const timer2 = setTimeout(() => {
			setIsSecondImageVisible(true);
		}, 600);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, [selectedFolder]);

	if (folder) {
		return (
			<div className={`relative w-full lg:w-1/2 p-10 py-12 ${className}`}>
				<div
					className={`scaleUp absolute overflow-hidden rounded-xl  w-[280px] sm:w-[310px]  lg:w-[360px] xl:w-[400px] 2xl:w-[450px] sm:left-6 xl:top-2/12 top-1/12 lg:left-0 left-2 z-20 ${
						isFirstImageVisible ? 'visible' : 'hidden'
					}`}
				>
					<Image key={`${folder.id} image 1`} alt={`${folder?.name} image 1`} src={folder.image1} />
				</div>
				<div
					className={`scaleUp absolute bottom-1/12 w-[280px] sm:w-[310px]  lg:w-[360px] xl:w-[400px] 2xl:w-[450px] sm:right-6 overflow-hidden rounded-xl lg:right-10 right-2 z-30 ${
						isSecondImageVisible ? 'visible' : 'hidden'
					}`}
				>
					<Image key={`${folder.id} image 2`} alt={`${folder?.name} image 2`} src={folder.image2} />
				</div>
			</div>
		);
	} else {
		return null;
	}
}
