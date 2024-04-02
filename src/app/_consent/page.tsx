import Link from 'next/link';
import { TbMoodHappy, TbMoodKid, TbNotes } from 'react-icons/tb';

const UNDERAGE = 'https://docs.google.com/document/d/1zcpaXKqbGB9boCZVeRNZqwV-qTB5C5gE_P99Gy-OARM/edit?usp=share_link';
const ADULT = 'https://docs.google.com/document/d/1WMwwzXPt3jcSoHQWOCSK5rxoUUfaVmIMi__vCGVhjeM/edit?usp=share_link';
const FORM = 'https://forms.gle/hViERgkovuwetjU76';

const ConsentPage = () => (
	<div className="flex h-screen w-screen items-center justify-center">
		<div className="flex h-full w-full  max-w-screen-lg flex-col items-center justify-center gap-8 p-8 py-28 md:flex-row">
			<Link
				href={FORM}
				className="flex aspect-square h-full max-h-96 w-full flex-col items-center justify-center gap-4 rounded-xl border border-border bg-bg-color"
			>
				<TbNotes size={128} />
				<h3 className="text-2xl font-black">форма за изпращане</h3>
			</Link>
			<div className="relative flex h-full w-full flex-col items-stretch gap-8">
				<Link
					href={UNDERAGE}
					className="flex h-full items-center justify-center gap-4 rounded-xl border border-border bg-bg-color"
				>
					<TbMoodKid size={64} />
					<h3 className="text-2xl font-black">непълнолетни</h3>
				</Link>
				<Link
					href={ADULT}
					className="flex h-full items-center justify-center gap-4 rounded-xl border border-border bg-bg-color"
				>
					<TbMoodHappy size={64} />
					<h3 className="text-2xl font-black">пълнолетни</h3>
				</Link>
			</div>
		</div>
	</div>
);

export default ConsentPage;
