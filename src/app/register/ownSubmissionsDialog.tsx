import Link from 'next/link';
import { getOwnSubmissions } from '@/app/register/form/getOwnSubmissions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TbArrowRight } from 'react-icons/tb';

export async function OwnSubmissionsDialog(props: React.PropsWithChildren<{ asChild?: boolean }>) {
	const ownSubmissions = await getOwnSubmissions();
	return (
		<Dialog modal>
			<DialogTrigger asChild={props.asChild}>{props.children}</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Редактирай регистрация</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center gap-1">
					{ownSubmissions.map((submission) => (
						<div key={submission.id} className="flex items-center gap-2">
							<Link
								href={`/register/${submission.id}/edit`}
								className="min-h-0 min-w-0 truncate hover:underline"
							>
								{submission.title}
							</Link>
							<Button variant="outline" className="z-50" asChild>
								<Link href={`/register/${submission.id}/edit`}>
									Редактирай <TbArrowRight className="ml-2" />
								</Link>
							</Button>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
