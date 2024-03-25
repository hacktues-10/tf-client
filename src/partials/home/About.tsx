import Link from 'next/link';

import { ABOUT_BUTTON, ABOUT_IMAGE, ABOUT_SUBTEXT, ABOUT_TEXT, ABOUT_TITLE } from '@/constants/home/about';

import 'animate.css';
import Image from 'next/image';

const About = () => (
	<section id="about" className="p-8 md:p-12">
		<div className="flex flex-col lg:flex-row gap-8 whitespace-pre-line items-center mb-5">
			{/* Text info */}
			<div className="w-full flex flex-col gap-4 text-justify">
				<h2 className="bg-gradient text-transparent font-black text-4xl sm:text-5xl bg-clip-text">
					{ABOUT_TITLE}
				</h2>
				<p className="">
					Денят на отворените врати на Технологично училище “Електронни системи” към Техническия университет -
					София, познат като ТУЕС ФЕСТ, наближава. Той ще се проведе на 20 и 21 април 2024 година на
					територията на София Тех Парк в Иновационен Форум “Джон Атанасов”.
				</p>
				<p className="">
					Ще имате възможност да се запознаете с ТУЕС към ТУ-София отблизо и с това какво ни прави различното
					училище: {'\n'}✔️ Връзката ни с ИТ бизнеса; {'\n'}✔️ Образователния ни модел;{'\n'}✔️ Силната и
					задружна общност;{'\n'}✔️ Връзката между настоящи и завършили възпитаници; {'\n'}✔️ Специалностите и
					предметите, които се изучават в ТУЕС към ТУ-София.
				</p>
				<p className="">
					TUES FEST 2024 &quot;Expand your horizon & Celebration through Innovation&quot; се организира от
					ученици за ученици! Доброволческият екип на организаторите вярват, че за поредна година ще покажат
					на света какво е да си ученик в ТУЕС към ТУ - София.
				</p>
				<p>
					Следете страницата на събитието{' '}
					<Link
						href="https://www.facebook.com/HackTUES"
						target="_blank"
						className="text-sand font-semibold underline cursor-pointer"
					>
						Hack TUES § TUES FEST
					</Link>
					!
				</p>

				{/* <i>{ABOUT_SUBTEXT}</i> */}
			</div>
			{/* Image */}
			<div className="w-full">
				<div className="animate__animated animate__backInRight rounded-md overflow-hidden">
					<img
						src={ABOUT_IMAGE}
						alt=""
						className="w-full rounded-md outline-none aspect-video shadow-2xl object-cover object-bottom"
					/>
				</div>
			</div>
		</div>
		<div className="w-full lg:w-1/2 justify-center">
			<Link
				href={'https://tues.bg'}
				target="_blank"
				className="w-fit px-4 py-2 m-auto md:mx-1/4 my-4 rounded-md text-xl bg-gradient font-bold uppercase hover:scale-105 transition-transform duration-300 shadow-2xl"
			>
				<span
					style={{
						textShadow: '3px 3px 13px rgba(0, 0, 0, 0.4)',
					}}
					className="text-zinc"
				>
					{ABOUT_BUTTON}
				</span>
			</Link>
		</div>
	</section>
);

export default About;
