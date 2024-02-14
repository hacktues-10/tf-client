'use client';
import { TbClockHour4, TbMapPin } from 'react-icons/tb';
import TitleSVG from '@/app/Title';
import { useDay } from '@/context/day';
import { useEffect, useState } from 'react';

export default function Logos() {
	const { day, setDay } = useDay();
	const [image, setImage] = useState('');
	useEffect(() => {
		if (day == 1) {
			setImage('/moto1.png');
		} else if (day == 2) {
			setImage('/moto2.png');
		}
	}, [day]);

	return (
		<div className="w-11/12 sm:w-2/3 md:w-3/4 lg:w-1/2">
			<div className="hidden md:block  p-8 m-10 sm:m-0 border sm:border-2 border-[#F2F2F2] bg-clip-padding rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-0 drop-shadow-lg">
				<TitleSVG className="w-full relative z-20" />
				<div className="w-full flex">
					<img src={'/35.png'} alt="35elsys" className="w-2/6 h-1/12" />
					<img src={image} alt={image} className="w-2/3 h-1/12" />
				</div>
			</div>
			<div className="block md:hidden border sm:border-2 border-[#F2F2F2] p-3 m-2  sm:m-0 bg-clip-padding rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-0 drop-shadow-lg">
				<img src={'/assets/TitleMobile.webp'} alt="titleMobile" className="w-full" />
				<div className="w-full flex">
					<img src={'/35.png'} alt="35elsys" className="w-2/6 h-1/12" />
					<img src={image} alt={image} className="w-2/3 h-1/12" />
				</div>
			</div>

			<div className="flex mx-1/4 mt-5 relative z-20 flex-col sm:flex-row items-stretch gap-4 text-center">
				<div className="w-full px-4 py-2 sm:hidden flex items-center backdrop-filter backdrop-blur-sm bg-opacity-0 justify-center gap-2 text-lg rounded-lg border sm:border-2 border-[#FEFEFE]">
					<TbMapPin size={24} />
					<p>{'София Тех Парк'}</p>
				</div>
				<div className="w-full px-4 py-2 flex items-center justify-center gap-2 backdrop-filter backdrop-blur-sm bg-opacity-0 text-lg rounded-lg  border sm:border-2 border-[#FEFEFE]">
					<TbClockHour4 size={24} />
					<p>20 и 21 април</p>
				</div>
			</div>
		</div>
	);
}
