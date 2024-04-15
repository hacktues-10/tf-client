'use client';

import { useEffect } from 'react';
import { IfTfFeatureOn } from '@/app/_integrations/growthbook/components';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LECTORS, SCHEDULE_DAY1, SCHEDULE_DAY2 } from '@/constants/home/schedule';
import { useDay } from '@/context/day';
import { cn } from '@/lib/utils';

function Schedule() {
	const { day } = useDay();
	const dayValue = `day-${day}`;

	useEffect(() => {
		const hash = window.location.hash;
		console.log(hash);
		if (hash === '#lectors') {
			setTimeout(() => {
				const el = document.getElementById('lectors');
				if (el) {
					el.scrollIntoView({ behavior: 'smooth' });
				}
			}, 0);
		}
		if (hash === '#schedule') {
			setTimeout(() => {
				const el = document.getElementById('schedule');
				if (el) {
					el.scrollIntoView({ behavior: 'smooth' });
				}
			}, 0);
		}
	}, []);

	return (
		<IfTfFeatureOn feature="schedule">
			<section id="schedule" className='gap-16" relative z-20 flex flex-col px-6 py-6 md:px-8'>
				<Tabs value={`${dayValue}`} className="w-full">
					<h2 className="mb-8 bg-gradient bg-clip-text text-5xl font-black text-transparent">
						Програма - Ден {day}
					</h2>

					<TabsContent value="day-1">
						<div className="flex flex-col gap-16 pt-4">
							{SCHEDULE_DAY1.map((item) => {
								return (
									<div
										key={item.title}
										className={`flex flex-col items-center gap-4 sm:flex-row md:gap-8
										`}
									>
										<div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-stroke p-[2px] hover:bg-gradient sm:!aspect-square sm:w-[unset] sm:rounded-full">
											<div className="flex aspect-auto w-full flex-col items-center justify-center gap-2 rounded-xl bg-bg-color px-4 py-3 sm:!aspect-square sm:h-28 sm:w-28 sm:rounded-full sm:py-8">
												<p className="text-lg font-bold">{item.start}</p>
												<div className="h-[2px] w-full shrink-0 rounded-full bg-border" />
												<p className="text-lg font-bold">{item.end}</p>
											</div>
										</div>
										<div className="flex w-full max-w-3xl flex-col gap-2 rounded-xl bg-stroke p-[2px] hover:bg-gradient sm:w-3/5">
											<div className="flex w-full flex-col gap-2 rounded-xl bg-bg-color p-4">
												<h3 className="mr-4 text-3xl font-bold">{item.title}</h3>
												<div className="h-[2px] w-full rounded-full bg-border" />
												<div
													className="text-gray-500 text-lg"
													dangerouslySetInnerHTML={{
														__html: item.description,
													}}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</TabsContent>
					<TabsContent value="day-2">
						<div className="flex flex-col gap-16 pt-4">
							{SCHEDULE_DAY2.map((item) => {
								return (
									<div
										key={item.title}
										className={`flex flex-col items-center gap-4 md:gap-8 ${
											item.pos === 'right' ? 'sm:flex-row-reverse' : 'sm:flex-row'
										}`}
									>
										<div className="flex w-full max-w-3xl flex-col gap-2 rounded-xl bg-stroke p-[2px] hover:bg-gradient sm:w-3/5">
											<div className="flex w-full flex-col gap-2 rounded-xl bg-bg-color p-4">
												<h3 className="mr-4 text-3xl font-bold">{item.title}</h3>
												<div className="h-[2px] w-full rounded-full bg-border" />
												<div
													className="text-gray-500 text-lg"
													dangerouslySetInnerHTML={{
														__html: item.description,
													}}
												/>
											</div>
										</div>
										<div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-stroke p-[2px] hover:bg-gradient sm:!aspect-square sm:w-[unset] sm:rounded-full">
											<div className="flex aspect-auto w-full flex-col items-center justify-center gap-2 rounded-xl bg-bg-color px-4 py-3 sm:!aspect-square sm:h-28 sm:w-28 sm:rounded-full sm:py-8">
												<p className="text-lg font-bold">{item.start}</p>
												<div className="h-[2px] w-full shrink-0 rounded-full bg-border" />
												<p className="text-lg font-bold">{item.end}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</TabsContent>
				</Tabs>
			</section>
			{day == 1 && (
				<section id="lectors" className="relative z-20 p-4 sm:p-0">
					<h2 className="mb-8 bg-gradient bg-clip-text text-5xl font-black text-transparent">Лектори</h2>
					<div className="flex w-full items-center justify-center gap-4">
						<div className="gird m-auto inline-grid grid-cols-2 items-center justify-center gap-3 lg:grid-cols-3">
							{LECTORS.map((item, index) => {
								return (
									<Dialog key={item.name}>
										<DialogTrigger className="outline-none">
											<div
												className={cn(
													'my-2 mb-4 flex w-fit max-w-[200px] flex-col justify-center rounded-xl border border-[#FEFEFE] bg-opacity-0 p-2 py-3 backdrop-blur-sm backdrop-filter transition-all duration-300 hover:scale-105 hover:border-sand sm:max-w-[290px] sm:border-2 sm:p-4 sm:px-5 sm:backdrop-blur-md hover:sm:border-b-4',
													index % 4 == 0 && 'rotate-3 sm:rotate-6 hover:sm:border-l-4 ',
													index % 4 == 1 && '-rotate-3 sm:-rotate-6 hover:sm:border-r-4 ',
													index % 4 == 2 && 'rotate-3 sm:rotate-6 hover:sm:border-r-4 ',
													index % 4 == 3 && '-rotate-3 sm:-rotate-6 hover:sm:border-l-4 '
												)}
											>
												<img
													src={item.photo}
													alt={item.name}
													className="mx-auto mb-5 flex h-[140px] w-[140px] items-center justify-center rounded-xl bg-stroke sm:h-[250px] sm:w-[250px]"
												/>
												<h3 className="text-lg font-semibold sm:text-xl">{item.name}</h3>
												<div className="h-[1px] w-full shrink-0 bg-white sm:h-auto sm:w-[1px]" />

												<i className="opacity-80">{item.lecture}</i>
											</div>
										</DialogTrigger>
										<DialogContent className="z-50 flex bg-white">
											<div>
												<DialogHeader className="mb-1">
													<div>
														<h2 className="mr-2 inline-block font-semibold">{item.name}</h2>
														<span>{item.about}</span>
													</div>
												</DialogHeader>
												<DialogDescription className="bg-white">
													{item.description}
												</DialogDescription>
											</div>
										</DialogContent>
									</Dialog>
								);
							})}
						</div>
					</div>
				</section>
			)}
		</IfTfFeatureOn>
	);
}

export default Schedule;
