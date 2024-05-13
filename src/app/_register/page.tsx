import { Suspense } from 'react';
import Link from 'next/link';
import { getOwnSubmissions } from '@/app/_register/form/service';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TbArrowRight } from 'react-icons/tb';

import { IfTfFeatureOff, IfTfFeatureOn } from '../_integrations/growthbook/components';
import { getSession } from '../api/auth/session';
import NotFound from '../not-found';
import RegisterForm from './form/form';

export default async function RegisterPage() {
	const session = await getSession();

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 self-center">
			<IfTfFeatureOn feature="tf-register-projects">
				{session?.user?.email && <RegisterForm email={session?.user?.email} />}
			</IfTfFeatureOn>
			<IfTfFeatureOn feature="tf-edit-projects">
				<Suspense fallback={null}>
					{/* @ts-expect-error */}
					<OwnSubmissions />
				</Suspense>
			</IfTfFeatureOn>
			<IfTfFeatureOff feature="tf-register-projects">
				<IfTfFeatureOff feature="tf-edit-projects">
					<NotFound />
				</IfTfFeatureOff>
			</IfTfFeatureOff>
		</div>
	);
}

async function OwnSubmissions() {
	const ownSubmissions = await getOwnSubmissions();
	if (!ownSubmissions.length) {
		return null;
	}
	return (
		<>
			<Dialog modal>
				<DialogTrigger asChild>
					<Button variant="outline" className="z-50">
						Редактирай регистрация
					</Button>
				</DialogTrigger>
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
			<div className="pt-10" />
		</>
	);
}
