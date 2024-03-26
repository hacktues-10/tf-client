'use client';

import { LECTURES } from '@/info/lectures';
import { IfTfFeatureOn } from '@/app/_integrations/growthbook/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDay } from '@/context/day';
import { LECTORS } from '@/constants/home/schedule';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
function Schedule() {
	const { day } = useDay();
	const dayValue = `day-${day}`;

	return (
		<IfTfFeatureOn feature="schedule">
			<section id="schedule" className='relative z-20 min-h-screen flex flex-col px-8 md:px-12 py-6 gap-16"'>
				<Tabs value={`${dayValue}`} className="w-full">
					<TabsContent value="day-1">
						<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text mb-8">Лектори</h2>

						{/* <div className="flex flex-col gap-16 pt-4">
							{LECTURES.map((item) => {
								return (
									<div
										key={item.title}
										className={`flex flex-col gap-4 md:gap-8 items-center ${'sm:flex-row'}`}
									>
										<div className="flex flex-col gap-2 w-full sm:w-3/5 max-w-3xl p-[2px] rounded-xl bg-stroke hover:bg-gradient">
											<div className="flex w-full flex-col gap-2 p-4 rounded-xl bg-bg-color">
												<h3 className="text-3xl font-bold mr-4">{item.title}</h3>
												<div className="w-full h-[2px] bg-border rounded-full" />
												<div
													className="text-lg text-gray-500"
													dangerouslySetInnerHTML={{
														__html: item.title,
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
						</div> */}
						<div className="w-full flex justify-center items-center gap-4">
							<div className="gird inline-grid items-center m-auto grid-cols-3 justify-center gap-3">
								{LECTORS.map((item, index) => {
									return (
										<div
											key={item.name}
											className={cn(
												'mb-10 rounded-xl border sm:border-2 border-[#FEFEFE] hover:border-sand p-7 backdrop-filter backdrop-blur-sm sm:backdrop-blur-md bg-opacity-0 hover:scale-105 transition-all w-fit duration-300',
												index % 4 == 0 && 'rotate-3 hover:sm:border-l-4 ',
												index % 4 == 1 && '-rotate-3 hover:sm:border-r-4 ',
												index % 4 == 2 && 'rotate-3 hover:sm:border-r-4 ',
												index % 4 == 3 && '-rotate-3 hover:sm:border-l-4 '
											)}
										>
											<img
												src={item.photo}
												alt={item.name}
												className="mb-5 w-[250px] h-[250px] flex items-center justify-center rounded-xl bg-stroke"
											/>
											<h3>{item.name}</h3>
											<p>{item.about}</p>
										</div>
									);
								})}
							</div>
						</div>
					</TabsContent>
					<TabsContent value="day-2">
						<div>
							<h1>day 2</h1>
						</div>
					</TabsContent>
				</Tabs>
			</section>
		</IfTfFeatureOn>
	);
}

export default Schedule;
