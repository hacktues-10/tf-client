'use client';
import { RegistrationSchema, registrationSchema } from './schema';
import { useState, useReducer, useEffect } from 'react';
import ProjectStep from './steps/projectStep';
import ContributorStep from './steps/contributorStep';
import FileUploadStep from './steps/filesUploadStep';

const defaultValues = {
	email: '',
	firstName: '',
	lastName: '',
	grade: '' as any,
	parallel: '' as any,
	phoneNumber: '',
	title: '',
	description: '',
	github: '',
	images: [''],
	video: '',
} satisfies RegistrationSchema;

export default function RegisterForm() {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, updateData] = useReducer(
		(state: RegistrationSchema, update: Partial<RegistrationSchema>) => ({
			...state,
			...update,
		}),
		{ ...defaultValues }
	);

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

	function handleNext(stepData: Partial<RegistrationSchema>) {
		console.log('formData in next', formData);
		if (currentStep != 2) {
			const loadedData = registrationSchema
				.partial()
				.safeParse(JSON.parse(localStorage.getItem('registrationData') || '{}'));

			if (loadedData.success) {
				localStorage.setItem(
					'registrationData',
					JSON.stringify({
						...loadedData,
						...stepData,
					})
				);

				localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: currentStep + 1 }));
			}
			updateData({ ...formData, ...stepData });
		} else {
			updateData({
				images: stepData.images,
				video: stepData.video,
			});
		}

		setCurrentStep((prev) => prev + 1);
	}

	useEffect(() => {
		console.log('form data', formData);
	}, [formData]);

	function handlePrev() {
		localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: currentStep - 1 }));
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	}

	async function handleSubmit(stepData: Partial<RegistrationSchema>) {
		console.log('data before update', formData);

		// const mergedData = { ...formData };
		// for (const key in stepData) {
		// 	if (
		// 		stepData[key as keyof RegistrationSchema] !== '' &&
		// 		stepData[key as keyof RegistrationSchema] != null &&
		// 		!(
		// 			Array.isArray(stepData[key as keyof RegistrationSchema]) &&
		// 			stepData[key as keyof RegistrationSchema]?.length === 0
		// 		) &&
		// 		stepData[key as keyof RegistrationSchema]?.name !== ''
		// 	) {
		// 		mergedData[key] = stepData[key];
		// 	}
		// }

		// updateData(mergedData);

		// const finalData = {
		// 	...mergedData,
		// 	images: mergedData.images.map((image) => `${mergedData.title}-${image.name}`),
		// 	video: `${mergedData.title}-${mergedData.video.name}`,
		// };

		// console.log(mergedData.video);

		// console.log('final data', finalData);

		// await RegisterProject(mergedData);
	}

	return (
		<div className="space-y-1 w-full">
			<ProjectStep
				className={currentStep === 1 ? '' : 'hidden'}
				defaultValues={defaultValues}
				initialData={formData}
				onNext={handleNext}
				onPrev={handlePrev}
			/>
			<FileUploadStep
				className={currentStep === 2 ? '' : 'hidden'}
				defaultValues={defaultValues}
				initialData={formData}
				onNext={handleNext}
				onPrev={handlePrev}
			/>
			<ContributorStep
				className={currentStep === 3 ? '' : 'hidden'}
				defaultValues={defaultValues}
				initialData={formData}
				onNext={handleSubmit}
				onPrev={handlePrev}
			/>
		</div>
	);
}
