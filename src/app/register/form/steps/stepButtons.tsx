import { Button } from '@/components/ui/button';

export default function StepButtons({
	onNext,
	onPrev,
	disableNext = false,
}: {
	onNext: () => void;
	onPrev: (() => void) | null;
	disableNext?: boolean;
}) {
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
			<Button
				type="button"
				onClick={() => onNext()}
				disabled={disableNext}
				className="bg-sand text-black hover:cursor-pointer"
			>
				Напред
			</Button>
		</div>
	);
}
