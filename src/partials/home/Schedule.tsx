'use client';

import { LECTURES } from '@/info/lectures';
import { IfTfFeatureOn } from '@/integrations/growthbook/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDay } from '@/context/day';
function Schedule() {
	const { day } = useDay();
	const dayValue = `day-${day}`;

	return (
		<IfTfFeatureOn feature="schedule">
			<section id="schedule" className='min-h-screen flex flex-col px-8 md:px-12 py-6 gap-16"'>
				<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text mb-8">Програма</h2>
				<Tabs value={`${dayValue}`} className="w-full">
					<TabsContent value="day-1">
						<div className="flex flex-col gap-16 pt-4">
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
