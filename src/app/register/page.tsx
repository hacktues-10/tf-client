import { Suspense } from 'react';
import { getOwnSubmissions } from '@/app/register/form/getOwnSubmissions';
import { OwnSubmissionsDialog } from '@/app/register/ownSubmissionsDialog';
import { Button } from '@/components/ui/button';

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
			{/* @ts-expect-error */}
			<OwnSubmissionsDialog asChild>
				<Button variant="outline" className="z-50">
					Редактирай регистрация
				</Button>
			</OwnSubmissionsDialog>
			<div className="pt-10" />
		</>
	);
}
