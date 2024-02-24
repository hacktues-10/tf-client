import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projectSchema } from '../schema';
import { Textarea } from '@/components/ui/textarea';
import StepButtons from './stepButtons';
import { useEffect } from 'react';

type ProjectSchema = z.infer<typeof projectSchema>;

export default function ProjectStep({
	defaultValues,
	initialData,
	onNext,
	onPrev,
	className,
}: {
	initialData: Partial<ProjectSchema>;
	defaultValues: ProjectSchema;
	onNext: (data: ProjectSchema) => void;
	onPrev: () => void;
	className?: string;
}) {
	const form = useForm<ProjectSchema>({
		resolver: zodResolver(projectSchema),
		defaultValues: initialData,
	});

	function onSubmit(values: ProjectSchema) {
		console.log(values);
	}

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	return (
		<div className={className}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
					<FormLabel className="text-xl">Регистрация на проект</FormLabel>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Име на проекта</FormLabel>
								<FormControl>
									<Input placeholder="Електродвигател" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание на проекта</FormLabel>
								<FormControl>
									<Textarea placeholder="Описвам електродвигателя..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тип на проекта</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Изберете тип на проекта" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-black">
											<SelectItem key="Софтуер" value="Софтуер">
												Софтуер
											</SelectItem>
											<SelectItem key="Хардуер" value="Хардуер">
												Хардуер
											</SelectItem>
											<SelectItem key="Battle Bots" value="Battle Bots">
												Battle Bots
											</SelectItem>
											<SelectItem key="Компютърни мрежи" value="Компютърни мрежи">
												Компютърни мрежи
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
						name="github"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Линк към GitHub хранилище</FormLabel>
								<FormControl>
									<Input placeholder="https://github.com/dimitarNzhelev/elektrodvigatel" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<StepButtons
						onPrev={null}
						onNext={() => {
							form.trigger().then((isValid) => {
								if (isValid) {
									onNext(form.getValues());
								}
							});
						}}
					/>{' '}
				</form>
			</Form>
		</div>
	);
}
