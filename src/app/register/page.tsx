import { getSession } from '../api/auth/session';
import RegisterForm from './form/form';

export default async function RegisterPage() {
	const session = await getSession();

	return (
		<div className="min-h-screen relative z-50 items-center w-full flex justify-center self-center">
			{session?.user?.email && <RegisterForm email={session?.user?.email} />}
		</div>
	);
}
