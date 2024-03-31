'use client';

import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadContextProvider from '@/app/register/context/upload';
import UploadDialog from '@/app/register/form/upload-dialog';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

import { RegistrationSchema, registrationSchema } from './schema';
import { registerProject } from './service';
import ContributorStep from './steps/contributorStep';
import FileUploadStep from './steps/filesUploadStep';
import ProjectStep from './steps/projectStep';

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
		const res = await registerProject(parsed);
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
		<UploadContextProvider>
			<UploadDialog />
			<div
				className={cn(
					'z-30 m-5 mt-24 flex w-5/6 rounded-xl bg-black p-5  md:w-3/4 xl:w-1/4',
					currentStep === 2 && 'mt-28'
				)}
			>
				<div className="w-full space-y-1">
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
		</UploadContextProvider>
	);
}
