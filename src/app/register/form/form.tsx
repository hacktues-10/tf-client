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
		demo: '',
	},
	files: {
		images: [''],
		video: '',
		thumbnail: '',
		penokarton: '',
	},
} satisfies RegistrationSchema;
export default function RegisterForm({ email }: { email: string }) {
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

	function handleNext(stepData: Partial<RegistrationSchema>) {
		const newStep = currentStep + 1;
		const loadedData = JSON.parse(localStorage.getItem('registrationData') || '{}');
		if (currentStep - formData.contributors.length === 1 && addContributor) {
			stepData.contributors = [...(stepData.contributors ?? []), defaultValues.contributors[0]];
		}

		if ((loadedData && currentStep === 1) || Object.keys(loadedData).length !== 0) {
			localStorage.setItem(
				'registrationData',
				JSON.stringify({
					...loadedData.data,
					...stepData,
				})
			);

			localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: newStep }));
		}

		updateData(stepData);
		setAddContributor(false);
		setCurrentStep(newStep);
	}

	function handlePrev() {
		localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: currentStep - 1 }));
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	}

	async function handleSubmit(stepData: Partial<RegistrationSchema>) {
		const mergedData = {
			...formData,
			files: {
				images: stepData.files?.images || [],
				video: stepData.files?.video ?? '',
				thumbnail: stepData.files?.thumbnail ?? '',
				penokarton: stepData.files?.penokarton ?? '',
			},
		};
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
				'xl:w-1/4 w-5/6 md:w-3/4 m-5 mt-24 bg-black flex z-30  p-5 relative rounded-xl',
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
						email={email}
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
					initialData={{
						...formData,
						files: {
							...formData.files,
							video: formData.files.video || '',
						},
					}}
					onNext={handleSubmit}
					onPrev={handlePrev}
				/>
			</div>
		</div>
	);
}
