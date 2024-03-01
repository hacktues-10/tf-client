'use client';
import { RegistrationSchema, registrationSchema } from './schema';
import { useState, useReducer, useEffect } from 'react';
import ProjectStep from './steps/projectStep';
import ContributorStep from './steps/contributorStep';
import FileUploadStep from './steps/filesUploadStep';
import { RegisterProject } from './service';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
const defaultValues = {
	contributors: [
		{
			email: '',
			firstName: '',
			lastName: '',
			grade: '' as any,
			parallel: '' as any,
			phoneNumber: '',
			tshirt: '' as any,
		},
	],
	project: {
		title: '',
		description: '',
		type: '' as any,
		github: '',
	},
	files: {
		images: [''],
		video: '',
	},
} satisfies RegistrationSchema;
export default function RegisterForm() {
	const [currentStep, setCurrentStep] = useState(1);
	const [addContributor, setAddContributor] = useState(false);
	const [formData, updateData] = useReducer(
		(state: RegistrationSchema, update: Partial<RegistrationSchema>) => ({
			...state,
			...update,
		}),
		{ ...defaultValues }
	);
	const { toast } = useToast();
	const router = useRouter();

	useEffect(() => {
		try {
			const localData = JSON.parse(localStorage.getItem('registrationData') ?? '{}');

			const localStorageCurrentStep = JSON.parse(
				localStorage.getItem('registrationDataCurrentStep') ?? '{}'
			).currentStep;
			console.log('local', localData);
			if (localStorageCurrentStep >= 1 && localStorageCurrentStep <= 3) {
				setCurrentStep(localStorageCurrentStep);
			}
			updateData(localData);
		} catch (e) {
			console.log('error', e);
			localStorage.removeItem('registrationDataCurrentStep');
			localStorage.removeItem('registrationData');
		}
	}, []);

	useEffect(() => {
		console.log('modify in add contrib', addContributor);
	}, [addContributor]);

	function handleNext(stepData: Partial<RegistrationSchema>) {
		const loadedData = JSON.parse(localStorage.getItem('registrationData') || '{}');
		console.log('loaded', loadedData);

		console.log('currentStep', currentStep);
		console.log('formData contributors.length', formData.contributors.length);
		console.log('addContributor', addContributor);
		if (currentStep - formData.contributors.length === 1 && addContributor) {
			stepData.contributors = [...(stepData.contributors ?? []), defaultValues.contributors[0]];
			setAddContributor(false);
			console.log('in the if statement');
		}

		console.log('stepData in normal', stepData);

		if ((loadedData && currentStep === 1) || loadedData.success) {
			localStorage.setItem(
				'registrationData',
				JSON.stringify({
					...loadedData.data,
					...stepData,
				})
			);

			localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: currentStep + 1 }));
		}

		updateData(stepData);

		setCurrentStep((prev) => prev + 1);
	}

	function handlePrev() {
		localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: currentStep - 1 }));
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	}

	useEffect(() => {
		console.log('formData', formData);
	}, [formData]);

	async function handleSubmit(stepData: Partial<RegistrationSchema>) {
		const mergedData = { ...formData, images: stepData.files?.images, video: stepData.files?.video };
		updateData(mergedData);

		const parsed = registrationSchema.parse(mergedData);
		const res = await RegisterProject(parsed);
		localStorage.removeItem('registrationData');
		localStorage.removeItem('registrationDataCurrentStep');
		if (res.success) {
			toast({ title: 'Успешна регистрация', description: res.message, variant: 'sand' });
			setTimeout(() => {
				router.push('/');
			}, 2000);
		} else {
			toast({ title: 'Грешка', description: res.message, variant: 'sand' });
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	}

	return (
		<div
			className={cn(
				'xl:w-1/4 w-5/6 md:w-3/4  bg-black flex z-30 m-5 p-5 rounded-xl',
				currentStep === 2 && 'mt-28'
			)}
		>
			<div className="space-y-1 w-full">
				<ProjectStep
					className={currentStep === 1 ? '' : 'hidden'}
					defaultValues={defaultValues}
					initialData={formData}
					onNext={handleNext}
					onPrev={handlePrev}
				/>

				{formData.contributors.map((contributor, index) => (
					<ContributorStep
						key={index}
						className={currentStep === index + 2 ? '' : 'hidden'}
						defaultValues={defaultValues}
						index={index}
						initialData={formData}
						onNext={handleNext}
						onPrev={handlePrev}
						currentStep={currentStep}
						setAddContributor={setAddContributor}
						addContributor={addContributor}
					/>
				))}
				<FileUploadStep
					className={currentStep === formData.contributors.length + 2 ? '' : 'hidden'}
					defaultValues={defaultValues}
					initialData={formData}
					onNext={handleSubmit}
					onPrev={handlePrev}
				/>
			</div>
		</div>
	);
}
