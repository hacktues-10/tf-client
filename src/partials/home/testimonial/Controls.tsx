import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

const Controls = ({ handlePrev, handleNext }: { handlePrev: () => void; handleNext: () => void }) => (
	<div className="flex items-center justify-center gap-2">
		<button
			onClick={handlePrev}
			className="rounded-lg border border-stroke bg-bg-color p-2 text-2xl hover:opacity-90"
		>
			<TbChevronLeft />
		</button>
		<button
			onClick={handleNext}
			className="rounded-lg border border-stroke bg-bg-color p-2 text-2xl hover:opacity-90"
		>
			<TbChevronRight />
		</button>
	</div>
);

export default Controls;
