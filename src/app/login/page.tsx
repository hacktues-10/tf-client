import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSession } from '../api/auth/session';
import { IfTfFeatureOn } from '../_integrations/growthbook/components';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
	title: 'Регистрация',
	description: 'Регистирайте се за участие в Hack TUES X',
};

export default async function SignUpPage() {
	const session = await getSession();
	if (session) {
		redirect('/signout');
	}
	return (
		<section className="flex mt-96 w-full h-screen bg-bg-color max-w-sm flex-col gap-5">
			<h1 className="text-center text-3xl font-extrabold">Регистрация</h1>
			<IfTfFeatureOn feature="login">
				<Card className="relative w-full p-6"></Card>
				<Separator />
			</IfTfFeatureOn>

			<p className="text-center text-xl">
				<Link href="/"></Link>
			</p>
		</section>
	);
}
