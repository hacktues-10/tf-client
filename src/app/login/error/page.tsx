import { Metadata } from 'next';
import Link from 'next/link';
// import { HTXLogoDuotone } from '~/app/components/logos';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Възникна грешка при влизането',
	description: 'Възникна грешка при влизането ви в Hack TUES X',
};

export default function LoginErrorPage({ searchParams: { error } }: { searchParams: { error?: string } }) {
	const errorPage = errors[error ?? 'default'] ?? errors.default;
	return (
		<section className="flex w-full max-w-lg flex-col gap-5">
			<Card className="flex w-full flex-col gap-5 p-6 text-center">
				<h1 className="text-3xl font-extrabold">{errorPage.heading}</h1>
				{errorPage.message}
			</Card>
			<Separator />
			<p className="cursor-default text-center text-xl">{/* <HTXLogoDuotone /> */}</p>
		</section>
	);
}

const errors: Record<
	string,
	{
		status: number;
		heading: React.ReactNode;
		message: React.ReactNode;
	}
> = {
	default: {
		// FIXME: statuses are not used. Next doesn't allow custom statuses on
		// pages. We could hack it with an API route (or middleware) that forwards
		// the request to a page and alters the status, but it's not worth it.
		status: 200,
		heading: 'Възникна грешка при влизането.',
		message: (
			<p>
				Моля, опитайте отново по-късно. Ако проблемът продължава, моля, свържете се с нас на адрес{' '}
				<a className="font-medium underline underline-offset-4" href="mailto:hacktues@elsys-bg.org">
					hacktues@elsys-bg.org
				</a>
				.
			</p>
		),
	},

	AccessDenied: {
		status: 403,
		heading: 'Достъпът е отказан',
		message: (
			<>
				<h1>Не е позволено влизането с този имейл адрес.</h1>
				<div>
					<Button asChild>
						<Link href="/login">Вход с друг имейл</Link>
					</Button>
				</div>
			</>
		),
	},
	Verification: {
		status: 403,
		heading: 'Невалиден линк за потвърждение',
		message: (
			<>
				<div>
					<p>Tози линк вече не е валиден.</p>
					<p>Може вече да е бил използван, или да е изтекъл.</p>
				</div>
				<div>
					<Button asChild>
						<Link href="/login">Вход</Link>
					</Button>
				</div>
			</>
		),
	},
};
