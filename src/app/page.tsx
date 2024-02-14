'use client';

import Expectations from '@/partials/home/Expectations';
import Schedule from '@/partials/home/Schedule';
import Sponsors from '@/partials/home/Sponsors';
import Testimonial from '@/partials/home/Testimonial';

import Statistics from '@/partials/home/Statistics';
import Logos from '@/partials/home/Logos';
export default function Home() {
	return (
		<main className="m-auto">
			<section className="p-1 pt-4 sm:p-4 w-full overflow-hidden min-h-screen flex flex-col items-center justify-center gap-4 md:gap-16 ">
				<Logos />
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
