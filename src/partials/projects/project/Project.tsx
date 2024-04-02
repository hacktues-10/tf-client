import Image from 'next/image';
import Link from 'next/link';
import { useVoteContext } from '@/context/vote';
import { TbBrandYoutube } from 'react-icons/tb';

import VoteButton from './VoteButton';

const Project = ({
	id,
	name,
	thumbnail,
	video,
	category,
}: {
	id: number;
	name: string;
	thumbnail: string;
	video?: string;
	category: string;
}) => {
	return (
		<div className="w-full shrink-0 px-4 md:w-1/2 lg:w-1/3 2xl:w-1/4">
			<div className="mb-10 rounded-xl border border-stroke bg-bg-color p-[18px]">
				<Link href={`/projects/${id}`}>
					<div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
						<Image
							src={thumbnail}
							alt={name}
							width={1280}
							height={720}
							className="aspect-video rounded-lg bg-dark object-cover"
						/>
					</div>
				</Link>
				<div>
					<h3>
						<Link
							href={`/projects/${id}`}
							title={name}
							className={`mb-3 line-clamp-1 inline-block text-lg font-semibold text-white hover:text-primary`}
						>
							{name}
						</Link>
					</h3>

					<div className="flex items-center justify-between border-t-2 border-stroke pt-5">
						{/* <VoteButton id={id} name={name} thumbnail={thumbnail} category={category} /> */}
						{/* <Link
							href={`/projects/${id}`}
							className="flex items-center justify-center rounded-md text-sm font-semibold text-white hover:text-primary sm:px-5"
						>
							виж проекта
						</Link> */}
						<Link
							href={`/projects/${id}`}
							className="flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-opacity-90 sm:px-5"
						>
							Виж проекта
						</Link>
						{video && (
							<Link
								href={video}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center rounded-md text-sm font-semibold text-white hover:text-primary sm:px-5"
							>
								<TbBrandYoutube size={32} />
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Project;
