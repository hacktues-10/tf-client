import PodkrepqAutoDisplay from './sponsors/PodkrepqAutoDisplay';

import { ALPHA_SPONSORS, GAMMA_SPONSORS, BETA_SPONSORS } from '@/constants/home/sponsors';
const Sponsors = () => (
	<section id="sponsors" className="relative z-20 p-8 md:p-12 mb-20">
		<div className="py-4 pb-8">
			<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text">Спонсори</h2>
		</div>
		<h2 className="bg-gradient text-transparent font-black mt-32 mb-4 text-3xl text-center bg-clip-text">
			Алфа Спонсори
		</h2>
		<PodkrepqAutoDisplay podkrepqshti={ALPHA_SPONSORS} />
		<h2 className="bg-gradient text-transparent font-black text-3xl mb-4 mt-32 text-center bg-clip-text">
			Бета Спонсори
		</h2>

		<PodkrepqAutoDisplay podkrepqshti={BETA_SPONSORS} />
		<h2 className="bg-gradient text-transparent font-black text-3xl mt-32 mb-4 text-center bg-clip-text">
			Гама Спонсори
		</h2>
		<PodkrepqAutoDisplay podkrepqshti={GAMMA_SPONSORS} />
	</section>
);

export default Sponsors;
