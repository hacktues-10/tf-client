import { IfTfFeatureOff, IfTfFeatureOn } from '../_integrations/growthbook/components';
import { getSession } from '../api/auth/session';
import NotFound from '../not-found';
import RegisterForm from './form/form';

export default async function RegisterPage() {
	const session = await getSession();

	return (
		<div className="flex min-h-screen w-full items-center justify-center self-center">
			<IfTfFeatureOn feature="tf-register-projects">
				{session?.user?.email && <RegisterForm email={session?.user?.email} />}
			</IfTfFeatureOn>
			<IfTfFeatureOff feature="tf-register-projects">
				<NotFound />
			</IfTfFeatureOff>
		</div>
	);
}
