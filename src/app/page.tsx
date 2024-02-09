import { TbClockHour4, TbMapPin } from 'react-icons/tb';

import About from '@/partials/home/About';
import Expectations from '@/partials/home/Expectations';
import Schedule from '@/partials/home/Schedule';
import Sponsors from '@/partials/home/Sponsors';
import Testimonial from '@/partials/home/Testimonial';

import 'animate.css';
import Statistics from '@/partials/home/Statistics';

export default function Home() {
	return (
		<main className="m-auto">
			<section
				id="front-section"
				className="p-1 sm:p-4 w-full min-h-screen flex flex-col items-center justify-center gap-4 md:gap-16 "
			>
				<div>
					<h1
						style={{ fontFamily: 'origin' }}
						className="!leading-none border-2 border-[#F2F2F2] m-10 sm:m-0 bg-clip-padding p-1 sm:p-4 rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-0 !tracking-wide text-8xl sm:text-8xl md:text-9xl text-center font-normal drop-shadow-lg"
					>
						TUES{' '}
						<span className="!leading-none !tracking-wide text-8xl sm:text-8xl md:text-9xl font-warzone97 text-center  font-normal bg-gradient text-transparent bg-clip-text drop-shadow-lg">
							FEST
						</span>
						<br className="text-3xl" />
						<span className="!leading-none p-2 !tracking-wide text-8xl sm:text-8xl md:text-9xl  font-normal drop-shadow-lg">
							2024
						</span>
					</h1>
					<div className="flex mx-1/4 mt-5 relative z-50 flex-col sm:flex-row items-stretch gap-4 text-center">
						<div className="w-full px-4 py-2 sm:hidden flex items-center backdrop-filter backdrop-blur-sm bg-opacity-0 justify-center gap-2 text-lg rounded-lg border border-border">
							<TbMapPin size={24} />
							<p>{'София Тех Парк'}</p>
						</div>
						<div className="w-full px-4 py-2 flex items-center justify-center gap-2 backdrop-filter backdrop-blur-sm bg-opacity-0 text-lg rounded-lg  border border-border">
							<TbClockHour4 size={24} />
							<p>23 април от 10:30</p>
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
