'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
	images: Array<File>(),
	video: File,
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
			const loadedData = registrationSchema
				.partial()
				.parse(JSON.parse(localStorage.getItem('registrationData') ?? '{}'));
			const localStorageCurrentStep = z
				.object({
					currentStep: z.number(),
				})
				.parse(JSON.parse(localStorage.getItem('registrationDataCurrentStep') ?? '{}')).currentStep;

			updateData(loadedData);
			setCurrentStep(localStorageCurrentStep);
		} catch (e) {
			localStorage.removeItem('registrationDataCurrentStep');
			localStorage.removeItem('registrationData');
		}
	}, []);

	function handleNext(stepData: Partial<RegistrationSchema>) {
		const loadedData = registrationSchema
			.partial()
			.parse(JSON.parse(localStorage.getItem('registrationData') || '{}'));

		localStorage.setItem(
			'registrationData',
			JSON.stringify({
				...loadedData,
				...stepData,
			})
		);

		localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: currentStep + 1 }));

		updateData(stepData);
		setCurrentStep((prev) => prev + 1);
		console.log(stepData);
	}

	function handlePrev() {
		localStorage.setItem('registrationDataCurrentStep', JSON.stringify({ currentStep: currentStep - 1 }));
		setCurrentStep((prev) => Math.max(prev - 1, 1));
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
				onNext={handleNext}
				onPrev={handlePrev}
			/>
		</div>
	);
}
