import RegisterForm from './form/form';

export default function RegisterPage() {
	return (
		<div className="min-h-screen items-center w-full flex justify-center self-center">
			<div className="xl:w-1/4 w-5/6 md:w-3/4  bg-black flex z-30 m-5 p-5 rounded-xl">
				<RegisterForm />
			</div>
		</div>
	);
}
