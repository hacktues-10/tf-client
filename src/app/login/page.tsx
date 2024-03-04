import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSession } from '../api/auth/session';
import { IfTfFeatureOff, IfTfFeatureOn } from '../_integrations/growthbook/components';
import { Card } from '@/components/ui/card';
import { SignInForm } from './form';
import NotFound from '../not-found';

export const metadata: Metadata = {
	title: 'Регистрация',
	description: 'Регистирайте се за участие в TUES Fest 2024',
};

export default async function SignUpPage() {
	const session = await getSession();

	if (session) {
		redirect('/');
	}
	return (
		<div className="w-full min-h-screen flex justify-center align-middle">
			<section className="flex z-40 rounded-xl w-full justify-center max-w-md flex-col gap-5">
				<IfTfFeatureOn feature="tf-register-projects">
					<Card className="bg-black w-full max-w-[90%] mx-auto font-semibold text-white p-6">
						<h1 className="text-center text-3xl font-extrabold my-4">Регистрация</h1>
						<SignInForm isRegister={false} />
					</Card>
				</IfTfFeatureOn>
				<IfTfFeatureOff feature="tf-register-projects">
					<NotFound />
				</IfTfFeatureOff>
			</section>
		</div>
	);
}
