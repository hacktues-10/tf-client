import { ReactNode } from 'react';
import Link from 'next/link';
import { Links } from '@/app/projects/[projectId]/page';
import { TbBrandGithub, TbGlobe } from 'react-icons/tb';

const Linky = ({ text, url, icon }: { text: string; url: string; icon: ReactNode }) => (
	<Link
		href={url}
		target="_blank"
		rel="noreferrer"
		className="hover:bg-bg-color-hover flex w-full items-center gap-2 rounded-xl border-2 border-border bg-black hover:bg-bg-color px-4 py-2"
	>
		{icon}
		<span className="text-md font-semibold">{text}</span>
	</Link>
);

const LinksContainer = ({ links }: { links: Links }) => (
	<div className="mt-4 mx-auto  w-[96%] m-auto md:w-[90%] lg:w-[70%]">
		<div className="rounded-xl border-2 border-border bg-black">
			<div className="flex flex-col gap-4 px-8 py-4">
				<div className="flex gap-4">
					<Linky text="GitHub" url={links.github} icon={<TbBrandGithub size={28} />} />
					{links.demo && <Linky text="Уебсайт" url={links.demo} icon={<TbGlobe size={28} />} />}
				</div>
			</div>
		</div>
	</div>
);

export default LinksContainer;
