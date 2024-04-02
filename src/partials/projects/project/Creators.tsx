import { Creator } from '@/app/_projects/[projectId]/page';

const Creators = ({ creators }: { creators: Creator[] }) => (
	<div className="w-full max-w-screen-lg">
		<div className="rounded-xl border-2 border-border bg-bg-color">
			<div className="flex flex-col gap-4 px-8 py-4">
				<div className="flex flex-wrap items-center justify-center gap-4">
					{creators?.map((creator) => (
						<div
							key={creator?.name}
							className="hover:bg-bg-color-hover flex w-full items-center gap-2 rounded-xl border-2 border-border bg-bg-color px-4 py-2 md:w-[calc(50%-1rem)]"
						>
							<p className="flex w-full break-before-avoid flex-col gap-1 whitespace-pre-line text-center sm:block">
								{creator?.name} <span className="text-sm opacity-70">от {creator?.class} клас</span>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

export default Creators;
