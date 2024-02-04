'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Quote from './testimonial/Quote';
import { useRef } from 'react';
import { TESTIMONIALS, TESTIMONIALS_TITLE } from '@/constants/home/testimonials';

const Testimonial = () => {
	const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
	return (
		<section className="min-h-[36rem] w-full relative p-8 md:p-12">
			<div className="min-h-full h-full flex flex-col justify-between gap-8">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-8">
					<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text">
						{TESTIMONIALS_TITLE}
					</h2>
				</div>
				<div className="flex justify-center">
					<Carousel
						opts={{
							loop: true,
						}}
						className="w-full max-w-5/6 lg:max-w-1/2"
						plugins={[plugin.current]}
						onMouseEnter={plugin.current.stop}
						onMouseLeave={plugin.current.reset}
					>
						<CarouselContent className="">
							{TESTIMONIALS.map((item) => (
								<CarouselItem className="self-center" key={item.img}>
									<Quote
										img={item.img}
										name={item.testimonyName}
										text={item.testimonyBody}
										desc={item.testimonyDesc}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="" />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default Testimonial;
