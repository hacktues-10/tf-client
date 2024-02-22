import { Button } from '@/components/ui/button';

export default function StepButtons({ onNext, onPrev }: { onNext: () => void; onPrev: (() => void) | null }) {
	const isDisabled = onPrev === null;

	return (
		<div className="flex justify-between">
			<Button
				type="button"
				disabled={isDisabled}
				onClick={() => {
					if (onPrev) onPrev();
				}}
				className="bg-sand text-black hover:cursor-pointer"
			>
				Назад
			</Button>
			<Button type="submit" onClick={() => onNext()} className="bg-sand text-black hover:cursor-pointer">
				Напред
			</Button>
		</div>
	);
}
