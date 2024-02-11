import { EXPECTATIONS } from '@/constants/home/expectations';

const Expectation = ({ icon, title, text }: { icon: JSX.Element; title: string; text: string }) => (
	<div className=" w-full md:w-2/5 lg:w-1/3 2xl:w-1/4">
		<div className="h-full group mb-10 rounded-xl border sm:border-2 border-[#FEFEFE] p-7 backdrop-filter backdrop-blur-sm sm:backdrop-blur-md bg-opacity-0 hover:scale-105 transition-all duration-300">
			<div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-stroke">{icon}</div>
			<h3 className="mb-2 text-xl font-bold text-white transition">{title}</h3>
			<p className="text-base font-medium text-body-color">{text}</p>
		</div>
	</div>
);

const Expectations = () => (
	<section id="expectations" className="relative z-20 flex flex-col p-8 md:px-12 gap-8">
		<h2 className="bg-gradient text-transparent font-black text-5xl bg-clip-text">На ТУЕС Фест очаквайте</h2>
		<div className="flex flex-wrap items-stretch justify-center gap-4">
			{EXPECTATIONS.map((expectation) => (
				<Expectation key={expectation.title} {...expectation} />
			))}
		</div>
	</section>
);

export default Expectations;
