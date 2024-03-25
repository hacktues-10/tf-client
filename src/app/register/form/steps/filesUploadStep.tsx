import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FilesReal } from '../schema';
import StepButtons from './stepButtons';
type FileUploadSchema = z.infer<typeof FilesReal>;
import { useEffect, useState } from 'react';
import { createPresignedUrl } from '../actions';

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
	const [validPenokarton, setValidPenokarton] = useState(false);
	const [targetPenokarton, setTargetPenokarton] = useState<File>();

	const canSubmit = validImages && validPenokarton;

	async function onSubmit() {
		if (targetImages) {
			const renamedImages = Array.from(targetImages).map((file) => {
				const newBlob = new Blob([file], { type: file.type });
				const renamedFile = new File([newBlob], `${initialData.project.title}-${file.name}`, {
					type: file.type,
				});

				return renamedFile;
			});

			for (let i = 0; i < renamedImages.length; i++) {
				const presignedUrl = await createPresignedUrl(renamedImages[i].name);

				const res = await fetch(presignedUrl, {
					method: 'PUT',
					body: renamedImages[i],
				});

				if (!res.ok) {
					console.error('Error uploading image');
				}
			}
		}

		if (targetVideo) {
			const newBlob = new Blob([targetVideo], { type: targetVideo.type });
			const renamedFile = new File([newBlob], `${initialData.project.title}-${targetVideo.name}`, {
				type: targetVideo.type,
			});

			const presignedUrl = await createPresignedUrl(renamedFile.name);

			const res = await fetch(presignedUrl, {
				method: 'PUT',
				body: renamedFile,
			});

			if (!res.ok) {
				console.error('Error uploading video');
			}
		}

		if (targetThumbnail) {
			const newBlob = new Blob([targetThumbnail], { type: targetThumbnail.type });
			const renamedFile = new File([newBlob], `${initialData.project.title}-Thumbnail-${targetThumbnail.name}`, {
				type: targetThumbnail.type,
			});

			const presignedUrl = await createPresignedUrl(renamedFile.name);

			const res = await fetch(presignedUrl, {
				method: 'PUT',
				body: renamedFile,
			});

			if (!res.ok) {
				console.error('Error uploading thumbnail');
			}
		}

		if (targetPenokarton) {
			const newBlob = new Blob([targetPenokarton], { type: targetPenokarton.type });
			const renamedFile = new File(
				[newBlob],
				`${initialData.project.title}-Penokarton-${targetPenokarton.name}`,
				{
					type: targetPenokarton.type,
				}
			);

			const presignedUrl = await createPresignedUrl(renamedFile.name);

			const res = await fetch(presignedUrl, {
				method: 'PUT',
				body: renamedFile,
			});

			if (!res.ok) {
				console.error('Error uploading penokarton');
			}
		}
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

	const handlePenokartonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			if (file.type !== 'application/pdf') {
				form.setError('files.penokarton', {
					type: 'manual',
					message: 'Можете да качите само pdf файл',
				});
				setValidPenokarton(false);
				e.target.value = '';
				return;
			}

			if (file.size > 20971520) {
				form.setError('files.penokarton', {
					type: 'manual',
					message: 'Файлът трябва да е по-малък от 20MB',
				});
				setValidPenokarton(false);
				e.target.value = '';
				return;
			}
			form.clearErrors('files.penokarton');

			setTargetPenokarton(file);
			setValidPenokarton(true);
			form.setValue('files.penokarton', `${initialData.project.title}-Penokarton-${file.name}`);
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
					<FormField
						control={form.control}
						name="files.penokarton"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mt-8">Пенокартон (размер А2, pdf формат)</FormLabel>
								<FormControl>
									<Input
										id="penokarton"
										accept=".pdf"
										onChange={handlePenokartonChange}
										type="file"
										className="bg-sand text-black hover:cursor-pointer"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormDescription>
						Регистрацията на проекти е отворена до 23:59:59 на 01.04.2024, до тогава трябва да са качени
						снимките на проекта и пенокартона. До 23:59:59 на 03.04.2024 ще бъде крайният срок за качване на
						видео и thumbnail. Можете да качите до 5 снимки. Допълнителна информация можете да намерите{' '}
						<Link
							href="https://docs.google.com/document/d/1WKlx92MRsf17cE-lgwCfdETZQxh4x14npFX9rjsuZkI/edit?usp=sharing"
							target="_blank"
							className="text-sand underline font-semibold"
						>
							тук
						</Link>
						.
					</FormDescription>
					<StepButtons
						onPrev={onPrev}
						disableNext={!canSubmit}
						isLast={true}
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
