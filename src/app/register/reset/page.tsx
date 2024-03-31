'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function ResetPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const session = useSession();

	useEffect(() => {
		localStorage.removeItem('registrationDataCurrentStep');
		localStorage.removeItem('registrationData');
		const signout = searchParams.get('signout');
		if (signout === '1') {
			if (session.status === 'authenticated') {
				void signOut({
					callbackUrl: '/login',
					redirect: true,
				});
			} else if (session.status === 'unauthenticated') {
				router.replace('/login');
			}
		} else {
			router.replace('/register');
		}
	}, [router, searchParams, session]);
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">
				Регистрацията е прекратена...
			</h2>
		</div>
	);
}
