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
		<div className="w-full rounded-xl bg-black block">
			<About />
			<div className="px-2 md:px-6 lg:px-10 xl:px-14 ">
				<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text">
					ТУЕС Фест през годините
				</h2>
				<div className="flex w-full">
					<History selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />

					<div className="p-2 w-1/3">
						{STATISTICS.map((statistic) => (
							<Card
								key={statistic.title}
								className={`my-4 pl-0 shadow-none pr-6 lg:p-6 pt-6 border-0 h-[300px] md:w-full xl:pr-10 text-white overflow-hidden bg-black rounded-xl`}
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
					<ImagesContainer selectedFolder={selectedFolder} />
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
						<Cell key={`cell-${index}`} fill={folder?.name == entry.name ? '#1f77b4' : 'currentColor'} />
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
		<div className="align-middle flex w-1/6 justify-center mx-10">
			<div className="grid grid-cols-2 gap-1 gap-y-0 h-2/3 my-auto">
				{FOLDERS.map((folder) => (
					<div
						className="p-5 hover:bg-gradient-to-br hover:cursor-pointer hover:from-primary hover:to-secondary hover:shadow-lg rounded-xl"
						key={folder.id}
						onClick={() => setSelectedFolder(folder.id)}
					>
						{selectedFolder == folder.id ? <FaRegFolderOpen size={56} /> : <FaRegFolder size={56} />}
						<h1 className="text-xl">{folder.name}</h1>
					</div>
				))}
			</div>
		</div>
	);
}

function ImagesContainer({ selectedFolder }: { selectedFolder: number }) {
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
			<div className="relative w-1/2 p-10">
				<div
					className={`scaleUp absolute overflow-hidden rounded-xl top-1/12 left-0 z-40 ${
						isFirstImageVisible ? 'visible' : 'hidden'
					}`}
				>
					<Image width={450} alt={`${folder?.name} image 1`} src={folder.image1} />
				</div>
				<div
					className={`scaleUp absolute bottom-1/12 overflow-hidden rounded-xl right-10 z-50 ${
						isSecondImageVisible ? 'visible' : 'hidden'
					}`}
				>
					<Image width={450} alt={`${folder?.name} image 2`} src={folder.image2} />
				</div>
			</div>
		);
	} else {
		return null;
	}
}
