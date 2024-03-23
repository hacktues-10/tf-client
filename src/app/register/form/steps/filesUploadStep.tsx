import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FilesReal } from '../schema';
import StepButtons from './stepButtons';
type FileUploadSchema = z.infer<typeof FilesReal>;
import { useEffect, useState } from 'react';

export default function FileUploadStep({
	defaultValues,
	initialData,
	onNext,
	onPrev,
	className,
}: {
	initialData: {
		files: { images: string[]; video: string };
		project: { title: string };
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
	const [targetThumbnail, setTargetThumbnail] = useState<File>();
	const [validThumbnail, setValidThumbnail] = useState(false);

	const canSubmit = validImages;

	async function onSubmit() {
		const formData = new FormData();

		if (targetImages) {
			console.log('images');
			const renamedImages = Array.from(targetImages).map((file) => {
				const newBlob = new Blob([file], { type: file.type });
				const renamedFile = new File([newBlob], `${initialData.project.title}-${file.name}`, {
					type: file.type,
				});

				return renamedFile;
			});

			for (let i = 0; i < renamedImages.length; i++) {
				formData.append('file', renamedImages[i], renamedImages[i].name);
			}
		}

		if (targetVideo) {
			console.log('video');
			const newBlob = new Blob([targetVideo], { type: targetVideo.type });
			const renamedFile = new File([newBlob], `${initialData.project.title}-${targetVideo.name}`, {
				type: targetVideo.type,
			});

			formData.append('file', renamedFile, renamedFile.name);
		}

		if (targetThumbnail) {
			console.log('thumbnail');
			const newBlob = new Blob([targetThumbnail], { type: targetThumbnail.type });
			const renamedFile = new File([newBlob], `${initialData.project.title}-Thumbnail-${targetThumbnail.name}`, {
				type: targetThumbnail.type,
			});
			formData.append('file', renamedFile, renamedFile.name);
		}

		console.log('upload');
		const res = await fetch('api/upload', {
			method: 'POST',
			body: formData,
		});
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (e.target.files && e.target.files.length > 5) {
				form.setError('files.images', {
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
						form.setError('files.images', {
							type: 'manual',
							message: 'Можете да качите само снимки в jpg, jpeg, png или webp формат',
						});
						setValidImages(false);
						e.target.value = '';
						return;
					}

					if (e.target.files[i].size > 20971520) {
						form.setError('files.images', {
							type: 'manual',
							message: 'Снимките трябва да са по-малки от 20MB',
						});
						setValidImages(false);
						e.target.value = '';
						return;
					}
				}
			}
			form.clearErrors('files.images');
			setTargetImages(e.target.files);
			const filesArray = Array.from(e.target.files).map((file) => `${initialData.project.title}-${file.name}`);
			form.setValue('files.images', filesArray);
			setValidImages(true);
		}
	};

	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			if (!file.type.includes('image')) {
				form.setError('files.thumbnail', {
					type: 'manual',
					message: 'Можете да качите само снимка в jpg, jpeg, png или webp формат',
				});
				setValidThumbnail(false);
				e.target.value = '';
				return;
			}

			if (file.size > 5242880) {
				form.setError('files.thumbnail', {
					type: 'manual',
					message: 'Снимката трябва да е по-малка от 5MB',
				});
				setValidThumbnail(false);
				e.target.value = '';
				return;
			}
			form.clearErrors('files.thumbnail');

			setTargetThumbnail(file);
			setValidThumbnail(true);
			form.setValue('files.thumbnail', `${initialData.project.title}-Thumbnail-${file.name}`);
		}
	};

	const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			if (file.type !== 'video/mp4') {
				form.setError('files.video', {
					type: 'manual',
					message: 'Можете да качите само видео в mp4 формат',
				});
				setValidVideo(false);
				e.target.value = '';
				return;
			}

			if (file.size > 209715200) {
				form.setError('files.video', {
					type: 'manual',
					message: 'Видеото трябва да е по-малко от 200MB',
				});
				setValidVideo(false);
				e.target.value = '';
				return;
			}
			form.clearErrors('files.video');

			setTargetVideo(file);
			setValidVideo(true);
			form.setValue('files.video', `${initialData.project.title}-${file.name}`);
		}
	};

	return (
		<div className={className}>
			<Form {...form}>
				<form className="w-full space-y-8">
					<FormLabel className="text-xl">Регистрация на проект</FormLabel>

					<FormField
						control={form.control}
						name="files.images"
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
						name="files.video"
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
					<FormField
						control={form.control}
						name="files.thumbnail"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mt-8">Thumbnail</FormLabel>
								<FormControl>
									<Input
										id="thumbnail"
										accept=".jpg, .jpeg, .png, .webp"
										onChange={handleThumbnailChange}
										type="file"
										className="bg-sand text-black hover:cursor-pointer"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormDescription>
						Можете да качите до 5 снимки, видео и thumbnail за вашия проект. Задължително е да качите
						снимките на проекта си тук, а видеото и thumbnail-а ще можете да ги качите после.
					</FormDescription>
					<StepButtons
						onPrev={onPrev}
						disableNext={!canSubmit}
						onNext={async () => {
							await onSubmit();
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
