import { Metadata } from 'next';
import { Card } from '@/components/ui/card';

// 'use client';
import { IfHTSession, IfNotHTSession } from '../api/auth/components';

export const metadata: Metadata = {
	title: 'Потвърдете имейл адреса си',
	description: 'Потвърдете вашия имейл адрес за да продължите',
};

export default function ConfirmEmailPage() {
	return (
		<div className="flex min-h-screen w-full justify-center align-middle">
			<section className="z-40 flex w-full max-w-lg flex-col justify-center gap-5 rounded-xl">
				<Card className="mx-auto flex w-full max-w-[90%] flex-col gap-3 bg-black p-6 text-white">
					<IfNotHTSession>
						<h1 className="text-center text-3xl font-extrabold">Потвърдете имейл адреса си!</h1>
						<p className="text-center">
							На вашия имейл адрес е изпратен линк за потвърждение. Моля, проверете входящата си поща.
						</p>
					</IfNotHTSession>
					<IfHTSession>
						<h1 className="text-center text-3xl font-extrabold">Успешно потвърдихте имейл адреса си!</h1>
						<p className="text-center">Можете да затворите тази страница.</p>
					</IfHTSession>
				</Card>
			</section>
		</div>
	);
}
