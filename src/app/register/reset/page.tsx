'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPage() {
	const router = useRouter();
	useEffect(() => {
		localStorage.removeItem('registrationDataCurrentStep');
		localStorage.removeItem('registrationData');
		router.replace('/register');
	});
	return null;
}
