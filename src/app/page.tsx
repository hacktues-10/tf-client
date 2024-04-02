import { Suspense } from 'react';
import { OwnSubmissionsDialog } from '@/app/register/ownSubmissionsDialog';
import Expectations from '@/partials/home/Expectations';
import Logos from '@/partials/home/Logos';
import Schedule from '@/partials/home/Schedule';
import Sponsors from '@/partials/home/Sponsors';
import Statistics from '@/partials/home/Statistics';
import Testimonial from '@/partials/home/Testimonial';
import { TbBallpen } from 'react-icons/tb';

export default function Home() {
	return (
		<main className="m-auto">
			<section className="flex min-h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden p-1 pt-4 sm:p-4 md:gap-16 ">
				<Logos
					ownSubmissionsDialog={
						<Suspense fallback={null}>
							{/* @ts-expect-error */}
							<OwnSubmissionsDialog asChild>
								<button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-black bg-[#fbebb7] px-4 py-2 text-lg text-black sm:border-2">
									<TbBallpen size={24} />
									<p>Редактирай регистрация</p>
								</button>
							</OwnSubmissionsDialog>
						</Suspense>
					}
				/>
			</section>
			<div className="mx-6 max-w-screen-2xl md:mx-20 2xl:m-auto">
				<Statistics />
			</div>
			<div className="m-auto w-full max-w-screen-2xl">
				<Expectations />
				<Schedule />
				<Sponsors />
				<Testimonial />
			</div>
		</main>
	);
}
