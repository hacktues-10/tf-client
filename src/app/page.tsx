import { TbClockHour4, TbMapPin } from 'react-icons/tb';

import Expectations from '@/partials/home/Expectations';
import Schedule from '@/partials/home/Schedule';
import Sponsors from '@/partials/home/Sponsors';
import Testimonial from '@/partials/home/Testimonial';

import Statistics from '@/partials/home/Statistics';
import TitleSVG from './Title';

export default function Home() {
	return (
		<main className="m-auto">
			<section className="p-1 pt-4 sm:p-4 w-full min-h-screen flex flex-col items-center justify-center gap-4 md:gap-16 ">
				<div className="w-11/12 sm:w-2/3 md:w-3/4 lg:w-1/2">
					<div className="hidden md:block  p-8 m-10 sm:m-0 border sm:border-2 border-[#F2F2F2] bg-clip-padding rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-0 drop-shadow-lg">
						<TitleSVG className="w-full relative z-20" />
					</div>
					<div className="block md:hidden border sm:border-2 border-[#F2F2F2] p-3 m-2  sm:m-0 bg-clip-padding rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-0 drop-shadow-lg">
						<img src={'/assets/TitleMobile.webp'} alt="titleMobile" className="w-full" />
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
			</section>
			<div className="max-w-screen-2xl 2xl:m-auto mx-6 md:mx-20">
				<Statistics />
			</div>

			<div className="max-w-screen-2xl w-full m-auto">
				<Expectations />
				<Schedule />
				<Sponsors />
				<Testimonial />
			</div>
		</main>
	);
}
