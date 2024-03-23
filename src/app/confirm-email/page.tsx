import { Metadata } from 'next';
// 'use client';
import { IfHTSession, IfNotHTSession } from '../api/auth/components';
import { Card } from '@/components/ui/card';
export const metadata: Metadata = {
	title: 'Потвърдете имейл адреса си',
	description: 'Потвърдете вашия имейл адрес за да продължите',
};

export default function ConfirmEmailPage() {
	return (
		<div className="w-full min-h-screen flex justify-center align-middle">
			<section className="flex z-40 rounded-xl w-full max-w-lg justify-center flex-col gap-5">
				<Card className="flex w-full max-w-[90%] mx-auto flex-col bg-black text-white gap-3 p-6">
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
