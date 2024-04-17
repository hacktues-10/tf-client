import { parseToken } from '@/server/vote/token';

export default async function VerifyVotePage({
	params: { token },
}: {
	params: {
		token: string;
	};
}) {
	const voter = await parseToken(token);
	if (!voter) {
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center text-center">
				<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">
					Този линк за гласуване е изтекъл или е невалиден.
					<br />
					Моля, опитайте отново.
				</h2>
			</div>
		);
	}

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center text-center">
			<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">
				Здравейте, {voter.name}!<br />
				Вие успешно потвърдихте своя глас.
			</h2>
		</div>
	);
}
