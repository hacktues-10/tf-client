'use client';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { STATISTICS } from '@/info/statistics';
import { TbSTurnDown } from 'react-icons/tb';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import About from './About';
import { BsPeople } from 'react-icons/bs';
import { PiProjectorScreenChart } from 'react-icons/pi';
import { FaRegBuilding } from 'react-icons/fa';
import { GrAchievement } from 'react-icons/gr';
import './styles.css';

export default function Statistics() {
	return (
		<div className="w-full rounded-xl bg-black block">
			<About />
			<div className="px-2 md:px-6 lg:px-10 xl:px-14 ">
				<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text">
					ТУЕС Фест през годините
				</h2>
				<div className="block md:hidden xl:flex">
					{STATISTICS.map((statistic) => (
						<FlipCard statistic={statistic} key={statistic.title} />
					))}
				</div>
				<div className="p-2">
					<div className="hidden md:flex xl:hidden">
						{STATISTICS.slice(0, 2).map((statistic) => (
							<FlipCard statistic={statistic} key={statistic.title} />
						))}
					</div>
					<div className="hidden md:flex xl:hidden">
						{STATISTICS.slice(2, 4).map((statistic) => (
							<FlipCard statistic={statistic} key={statistic.title} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function FlipCard({ statistic }: { statistic: (typeof STATISTICS)[0] }) {
	return (
		<Card
			key={statistic.title}
			className={`flip-card p-2 m-2 my-4 pl-0 pr-6 lg:m-6 pt-6 border-0 h-[300px] hover:cursor-pointer md:w-full xl:w-1/4 text-white overflow-hidden bg-dark rounded-xl`}
		>
			<div
				className="flip-card-inner"
				onClick={(e) => {
					const flipCard = e.currentTarget as HTMLElement;
					if (flipCard) {
						flipCard.style.transform == 'rotateY(180deg)'
							? (flipCard.style.transform = 'rotateY(0deg)')
							: (flipCard.style.transform = 'rotateY(180deg)');
					}
				}}
			>
				<div className="flip-card-front bg-dark">
					<div className="flex justify-center m-2">
						<HeaderIcon icon={statistic.icon} />
						<CardTitle className="ml-2">{statistic.title}</CardTitle>
					</div>
					<CardContent className="my-4">
						<CardDescription className="text-xl">{statistic.description}</CardDescription>
					</CardContent>
				</div>

				<div className="flip-card-back bg-dark">
					<div className="flex justify-center m-2">
						<HeaderIcon icon={statistic.icon} />
						<CardTitle className="ml-2">{statistic.title}</CardTitle>
					</div>
					<div className="bg-dark">
						<BarStatistic data={statistic.data} />
					</div>
				</div>
			</div>
		</Card>
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
	data,
}: {
	data: {
		name: string;
		total: number;
	}[];
}) {
	return (
		<ResponsiveContainer width="100%" className="my-6" height={200}>
			<BarChart data={data}>
				<XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
			</BarChart>
		</ResponsiveContainer>
	);
}
