import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { number, set, z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FilesReal } from '../schema';
import StepButtons from './stepButtons';
import { onSubmitImages, onSubmitVideo } from '../actions';
type FileUploadSchema = z.infer<typeof FilesReal>;
import { useEffect, useState } from 'react';
import { init } from 'next/dist/compiled/webpack/webpack';

export default function FileUploadStep({
	defaultValues,
	initialData,
	onNext,
	onPrev,
	className,
}: {
	initialData: {
		images: string[];
		video: string;
		title: string;
	};
	defaultValues: FileUploadSchema;
	onNext: (data: FileUploadSchema) => void;
	onPrev: () => void;
	className?: string;
}) {
	const form = useForm<FileUploadSchema>({
		resolver: zodResolver(FilesReal),
		defaultValues: initialData,
	});

	const [targetImages, setTargetImages] = useState<FileList>();
	const [targetVideo, setTargetVideo] = useState<File>();
	const [validImages, setValidImages] = useState(false);
	const [validVideo, setValidVideo] = useState(false);

	const canSubmit = validImages && validVideo;

	async function onSubmit() {
		if (targetImages) {
			const renamedImages = Array.from(targetImages).map((file) => {
				const newBlob = new Blob([file], { type: file.type });
				const renamedFile = new File([newBlob], `${initialData.title}-${file.name}`, { type: file.type });

				return renamedFile;
			});

			await onSubmitImages(renamedImages);
		} else {
			console.log('No images');
		}
		if (targetVideo) {
			const newBlob = new Blob([targetVideo], { type: targetVideo.type });
			const renamedFile = new File([newBlob], `${initialData.title}-${targetVideo.name}`, {
				type: targetVideo.type,
			});

			await onSubmitVideo(renamedFile);
		} else {
			console.log('No video');
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (e.target.files && e.target.files.length > 5) {
				form.setError('images', {
					type: 'manual',
					message: 'Можете да качите най-много 5 снимки',
				});
				setValidImages(false);
				e.target.value = '';
				return;
			}

			if (e.target.files) {
				for (let i = 0; i < e.target.files.length; i++) {
					if (!e.target.files[i].type.includes('image')) {
						form.setError('images', {
							type: 'manual',
							message: 'Можете да качите само снимки в jpg, jpeg, png или webp формат',
						});
						setValidImages(false);
						e.target.value = '';
						return;
					}
				}
			}
			form.clearErrors('images');
			setTargetImages(e.target.files);
			const filesArray = Array.from(e.target.files).map((file) => `${initialData.title}-${file.name}`);
			form.setValue('images', filesArray);
			setValidImages(true);
		}
	};

	const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			if (file.type !== 'video/mp4') {
				form.setError('video', {
					type: 'manual',
					message: 'Можете да качите само видео в mp4 формат',
				});
				setValidVideo(false);
				e.target.value = '';
				return;
			}

			if (file.size > 52428800) {
				form.setError('video', {
					type: 'manual',
					message: 'Видеото трябва да е по-малко от 50MB',
				});
				setValidVideo(false);
				e.target.value = '';
				return;
			}
			form.clearErrors('video');

			setTargetVideo(file);
			setValidVideo(true);
			form.setValue('video', `${initialData.title}-${file.name}`);
		}
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
								<FormMessage>
									{form.formState.errors.images && 'Your error message for images'}
								</FormMessage>
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
						disableNext={!canSubmit}
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
