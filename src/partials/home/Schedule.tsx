'use client';

import { LECTURES } from '@/info/lectures';
import { IfTfFeatureOn } from '@/app/_integrations/growthbook/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDay } from '@/context/day';
import { LECTORS, SCHEDULE_DAY1, SCHEDULE_DAY2 } from '@/constants/home/schedule';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
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
			<section id="schedule" className='relative z-20 flex flex-col px-6 md:px-8 py-6 gap-16"'>
				<Tabs value={`${dayValue}`} className="w-full">
					<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text mb-8">
						Програма - Ден {day}
					</h2>

					<TabsContent value="day-1">
						<div className="flex flex-col gap-16 pt-4">
							{SCHEDULE_DAY1.map((item) => {
								return (
									<div
										key={item.title}
										className={`flex flex-col gap-4 md:gap-8 items-center sm:flex-row
										`}
									>
										<div className="w-full sm:w-[unset] flex flex-col items-center justify-center gap-2 sm:!aspect-square p-[2px] rounded-xl sm:rounded-full bg-stroke hover:bg-gradient">
											<div className="w-full aspect-auto rounded-xl flex flex-col items-center justify-center gap-2 sm:!aspect-square sm:h-28 sm:w-28 px-4 py-3 sm:py-8 sm:rounded-full bg-bg-color">
												<p className="text-lg font-bold">{item.start}</p>
												<div className="shrink-0 w-full h-[2px] bg-border rounded-full" />
												<p className="text-lg font-bold">{item.end}</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-3/5 max-w-3xl p-[2px] rounded-xl bg-stroke hover:bg-gradient">
											<div className="flex w-full flex-col gap-2 p-4 rounded-xl bg-bg-color">
												<h3 className="text-3xl font-bold mr-4">{item.title}</h3>
												<div className="w-full h-[2px] bg-border rounded-full" />
												<div
													className="text-lg text-gray-500"
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
										className={`flex flex-col gap-4 md:gap-8 items-center ${
											item.pos === 'right' ? 'sm:flex-row-reverse' : 'sm:flex-row'
										}`}
									>
										<div className="flex flex-col gap-2 w-full sm:w-3/5 max-w-3xl p-[2px] rounded-xl bg-stroke hover:bg-gradient">
											<div className="flex w-full flex-col gap-2 p-4 rounded-xl bg-bg-color">
												<h3 className="text-3xl font-bold mr-4">{item.title}</h3>
												<div className="w-full h-[2px] bg-border rounded-full" />
												<div
													className="text-lg text-gray-500"
													dangerouslySetInnerHTML={{
														__html: item.description,
													}}
												/>
											</div>
										</div>
										<div className="w-full sm:w-[unset] flex flex-col items-center justify-center gap-2 sm:!aspect-square p-[2px] rounded-xl sm:rounded-full bg-stroke hover:bg-gradient">
											<div className="w-full aspect-auto rounded-xl flex flex-col items-center justify-center gap-2 sm:!aspect-square sm:h-28 sm:w-28 px-4 py-3 sm:py-8 sm:rounded-full bg-bg-color">
												<p className="text-lg font-bold">{item.start}</p>
												<div className="shrink-0 w-full h-[2px] bg-border rounded-full" />
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
				<section id="lectors" className="relative z-20 min">
					<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text mb-8">Лектори</h2>
					<div className="w-full flex justify-center items-center gap-4">
						<div className="gird inline-grid items-center m-auto grid-cols-2 lg:grid-cols-3 justify-center gap-3">
							{LECTORS.map((item, index) => {
								return (
									<Dialog key={item.name}>
										<DialogTrigger>
											<div
												className={cn(
													'mb-4 my-2 rounded-xl max-w-[200px] sm:max-w-[290px] border sm:border-2 border-[#FEFEFE] hover:border-sand hover:sm:border-b-4 p-4 px-5 backdrop-filter backdrop-blur-sm sm:backdrop-blur-md bg-opacity-0 hover:scale-105 transition-all w-fit duration-300',
													index % 4 == 0 && 'rotate-3 sm:rotate-6 hover:sm:border-l-4 ',
													index % 4 == 1 && '-rotate-3 sm:-rotate-6 hover:sm:border-r-4 ',
													index % 4 == 2 && 'rotate-3 sm:rotate-6 hover:sm:border-r-4 ',
													index % 4 == 3 && '-rotate-3 sm:-rotate-6 hover:sm:border-l-4 '
												)}
											>
												<img
													src={item.photo}
													alt={item.name}
													className="mb-5 w-[120px] h-[120px] sm:w-[250px] sm:h-[250px] flex items-center justify-center rounded-xl bg-stroke"
												/>
												<h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
												<div className="w-full sm:w-[1px] h-[1px] sm:h-auto shrink-0 bg-white" />

												<i className="opacity-80">{item.lecture}</i>
											</div>
										</DialogTrigger>
										<DialogContent className="flex z-50 bg-white">
											<div>
												<DialogHeader className="mb-1">
													<div>
														<h2 className="font-semibold inline-block mr-2">{item.name}</h2>
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
