import PodkrepqAutoDisplay from './sponsors/PodkrepqAutoDisplay';

import { ALPHA_SPONSORS, GAMMA_SPONSORS, BETA_SPONSORS, PARTNERS } from '@/constants/home/sponsors';
const Sponsors = () => (
	<section id="sponsors" className="relative z-20 mb-20 p-8 md:p-12">
		<div className="py-4 pb-8">
			<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">Спонсори</h2>
		</div>
		<h2 className="mb-4 mt-32 bg-gradient bg-clip-text text-center text-3xl font-black text-transparent">
			Алфа Спонсори
		</h2>
		<PodkrepqAutoDisplay podkrepqshti={ALPHA_SPONSORS} />
		<h2 className="mb-4 mt-32 bg-gradient bg-clip-text text-center text-3xl font-black text-transparent">
			Бета Спонсори
		</h2>

		<PodkrepqAutoDisplay podkrepqshti={BETA_SPONSORS} />
		<h2 className="mb-4 mt-32 bg-gradient bg-clip-text text-center text-3xl font-black text-transparent">
			Гама Спонсори
		</h2>
		<PodkrepqAutoDisplay podkrepqshti={GAMMA_SPONSORS} />
		<h2 className="mb-4 mt-32 bg-gradient bg-clip-text text-center text-3xl font-black text-transparent">
			Партньори
		</h2>
		<PodkrepqAutoDisplay podkrepqshti={PARTNERS} />
	</section>
);

export default Sponsors;
