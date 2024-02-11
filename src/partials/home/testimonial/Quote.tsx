import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

const Quote = ({ img, name, text, desc }: { img: string; name: string; text: string; desc: string }) => (
	<div className="w-full relative max-w-3xl p-6 flex flex-col sm:flex-row items-stretch justify-start gap-4 rounded-lg backdrop-filter backdrop-blur-sm sm:backdrop-blur-md bg-opacity-0 border border-[#FEFEFE]">
		<div className="sm:w-32 shrink-0 flex flex-col items-center justify-center gap-4">
			<Image
				key={img}
				src={img}
				alt={name}
				width={128}
				height={128}
				priority
				className="!w-32 !h-32 rounded-lg !aspect-square"
			/>
			<h3 className="text-lg font-bold text-gray-800 font-inter tracking-wide leading-6">{name}</h3>
		</div>
		<div className="w-full sm:w-[1px] h-[1px] sm:h-auto shrink-0 bg-stroke" />
		<div className="flex flex-col justify-between gap-4">
			{text.length > 300 && (
				<ScrollArea className="h-[300px] md:h-[200px] ">
					<p className="text-justify">{text}</p>
				</ScrollArea>
			)}
			{text.length <= 300 && <p className="text-justify">{text}</p>}
			<i className="opacity-50">{desc}</i>
		</div>
	</div>
);

export default Quote;
