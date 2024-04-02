import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';

import { IfTfFeatureOff, IfTfFeatureOn } from '../_integrations/growthbook/components';
import { getSession } from '../api/auth/session';
import NotFound from '../not-found';
import { SignInForm } from './form';

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
		<div className="flex min-h-screen w-full justify-center align-middle">
			<section className="z-40 flex w-full max-w-md flex-col justify-center gap-5 rounded-xl">
				<IfTfFeatureOn feature="tf-register-projects">
					<Card className="mx-auto w-full max-w-[90%] bg-black p-6 font-semibold text-white">
						<h1 className="my-4 text-center text-3xl font-extrabold">Регистрация</h1>
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
