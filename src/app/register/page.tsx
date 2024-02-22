import RegisterForm from './form/form';

export default function RegisterPage() {
	return (
		<div className="min-h-screen items-center w-full flex justify-center self-center">
			<div className="w-1/4 bg-black flex z-50 m-5 p-5 rounded-xl">
				<RegisterForm />
			</div>
		</div>
	);
}
