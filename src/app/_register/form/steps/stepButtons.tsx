import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function StepButtons({
	onNext,
	onPrev,
	disableNext = false,
	isLast = false,
}: {
	onNext: () => void;
	onPrev: (() => void) | null;
	disableNext?: boolean;
	isLast?: boolean;
}) {
	const isDisabled = onPrev === null;
	const [disable, setDisabled] = useState(disableNext);

	useEffect(() => {
		setDisabled(disableNext);
	}, [disableNext]);

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
				onClick={() => {
					if (isLast) setDisabled(true);
					onNext();
				}}
				disabled={disable}
				className="bg-sand text-black hover:cursor-pointer"
			>
				Напред
			</Button>
		</div>
	);
}
