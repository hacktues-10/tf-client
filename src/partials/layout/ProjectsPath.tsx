'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';

const ProjectsPath = ({
	path,
}: {
	path:
		| {
				name: string;
				url: string;
		  }[]
		| null
		| undefined;
}) => {
	if (!path) return null;

	return (
		<section className="pt-28">
			<div className="container">
				<div className="rounded-lg border-2 border-stroke bg-bg-color px-8 py-5">
					<ul className="items-cente flex flex-wrap  gap-3 text-ellipsis">
						{path.map((item) => (
							<>
								{item?.url ? (
									<>
										<Link
											key={item?.url}
											href={item?.url || '#'}
											className={`text-white ${item?.url && 'hover:text-primary'}`}
										>
											<li className="flex items-center text-base font-medium text-white">
												{item?.name}
												<span className="pl-3"> / </span>
											</li>
										</Link>
									</>
								) : (
									<li key={'end'} className="flex items-center text-base font-medium text-white">
										{item?.name}
									</li>
								)}
							</>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default ProjectsPath;
