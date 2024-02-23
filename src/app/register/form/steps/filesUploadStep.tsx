import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { number, z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilesReal, fileUploadSchema } from '../schema';
import { Textarea } from '@/components/ui/textarea';
import StepButtons from './stepButtons';
import { onSubmitImages, onSubmitVideo } from '../actions';
type FileUploadSchema = z.infer<typeof FilesReal>;
type FileCheckerSchema = z.infer<typeof fileUploadSchema>;
import { useState } from 'react';

export default function FileUploadStep({
	defaultValues,
	initialData,
	onNext,
	onPrev,
	className,
}: {
	initialData: Partial<FileUploadSchema>;
	defaultValues: FileUploadSchema;
	onNext: (data: FileUploadSchema) => void;
	onPrev: () => void;
	className?: string;
}) {
	const form = useForm<FileCheckerSchema>({
		resolver: zodResolver(fileUploadSchema),
		defaultValues: initialData,
	});

	const [targetImages, setTargetImages] = useState<FileList>();
	const [targetVideo, setTargetVideo] = useState<File>();
	async function onSubmit() {
		if (targetImages) {
			await onSubmitImages(targetImages);
			const filesArray = Array.from(targetImages).map((file) => file.name);
			form.setValue('images', filesArray);
		} else {
			console.log('No images');
		}
		if (targetVideo) {
			await onSubmitVideo(targetVideo);

			if (targetVideo?.type === 'video/mp4') {
				form.setValue('video', targetVideo.name);
			} else {
				console.log('Invalid file');
				form.setValue('video', '');
			}
		} else {
			console.log('No video');
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (e.target.files && e.target.files.length > 5) {
				alert('You can only upload a maximum of 5 files');
				e.target.value = '';
				return;
			}

			setTargetImages(e.target.files);
			const filesArray = Array.from(e.target.files);

			form.setValue('images', filesArray);
		}
	};

	const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setTargetVideo(file);
		if (file) form.setValue('video', file);
	};

	return (
		<div className={className}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
					<FormLabel className="text-xl">Регистрация на проект</FormLabel>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Снимки</FormLabel>
								<FormControl>
									<Input
										multiple
										id="pictures"
										onChange={handleFileChange}
										type="file"
										accept=".jpg, .jpeg, .png, .webp"
										className="bg-sand text-black hover:cursor-pointer"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="video"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mt-8">Видео</FormLabel>
								<FormControl>
									<Input
										id="video"
										accept=".mp4"
										onChange={handleVideoChange}
										type="file"
										className="bg-sand text-black hover:cursor-pointer"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<StepButtons
						onPrev={onPrev}
						onNext={() => {
							form.trigger().then((isValid) => {
								if (isValid) {
									onNext(form.getValues());
								}
							});
						}}
					/>
				</form>
			</Form>
		</div>
	);
}
