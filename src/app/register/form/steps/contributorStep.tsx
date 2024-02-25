import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contributorSchema } from '../schema';
import StepButtons from './stepButtons';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ContributorSchema = z.infer<typeof contributorSchema>;

export default function ContributorStep({
	defaultValues,
	initialData,
	onNext,
	index,
	onPrev,
	className,
	setAddContributor,
	addContributor,
	currentStep,
}: {
	initialData: Partial<ContributorSchema>;
	defaultValues: ContributorSchema;
	index: number;
	onNext: (data: ContributorSchema) => void;
	onPrev: () => void;
	className?: string;
	addContributor: boolean;
	setAddContributor: (state: boolean) => void;
	currentStep: number;
}) {
	const form = useForm<ContributorSchema>({
		resolver: zodResolver(contributorSchema),
		defaultValues: initialData,
	});

	function onSubmit(values: ContributorSchema) {
		console.log(values);
	}

	useEffect(() => {
		console.log(form.getValues());
	}, [form]);

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	useEffect(() => {
		if (addContributor) {
			onNext(form.getValues());
		}
	}, [addContributor, form, onNext]);
	return (
		<div className={className}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
					<FormLabel className="text-xl">Регистрация на ученик</FormLabel>
					<FormField
						control={form.control}
						name={`contributors.${index}.email`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имейл (elsys)</FormLabel>
								<FormControl>
									<Input placeholder="uchenik.2023@elsys-bg.org" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`contributors.${index}.firstName`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Първо име</FormLabel>
								<FormControl>
									<Input placeholder="Калин" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`contributors.${index}.lastName`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Фамилия</FormLabel>
								<FormControl>
									<Input placeholder="Георгиев" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`contributors.${index}.tshirt`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Размер тениска</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Изберете размер тениска" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-black">
											<SelectItem key="S" value="S">
												S
											</SelectItem>
											<SelectItem key="M" value="M">
												M
											</SelectItem>
											<SelectItem key="L" value="L">
												L
											</SelectItem>
											<SelectItem key="XL" value="XL">
												XL
											</SelectItem>
											<SelectItem key="XXL" value="XXL">
												XXL
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`contributors.${index}.grade`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Клас</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Изберете клас" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-black">
											<SelectItem key="8" value="8">
												8
											</SelectItem>
											<SelectItem key="9" value="9">
												9
											</SelectItem>
											<SelectItem key="10" value="10">
												10
											</SelectItem>
											<SelectItem key="11" value="11">
												11
											</SelectItem>
											<SelectItem key="12" value="12">
												12
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`contributors.${index}.parallel`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Паралелка</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Изберете паралелка" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-black">
											<SelectItem key="A" value="А">
												А
											</SelectItem>
											<SelectItem key="Б" value="Б">
												Б
											</SelectItem>
											<SelectItem key="В" value="В">
												В
											</SelectItem>
											<SelectItem key="Г" value="Г">
												Г
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`contributors.${index}.phoneNumber`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Телефонен номер</FormLabel>
								<FormControl>
									<Input placeholder="0888888888" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						onClick={() => {
							form.trigger().then((isValid) => {
								console.log(form);
								if (isValid) {
									console.log('is valid');
									setAddContributor(true);
								} else {
									console.log('is not valid');
								}
							});
						}}
						className={cn('bg-sand text-black hover:cursor-pointer', index >= 4 ? 'hidden' : '')}
					>
						Добави съотборник
					</Button>
					<StepButtons
						onNext={() => {
							form.trigger().then((isValid) => {
								if (isValid) {
									onNext(form.getValues());
								}
							});
						}}
						onPrev={onPrev}
					/>
				</form>
			</Form>
		</div>
	);
}
