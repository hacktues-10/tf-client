'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUploadContext } from '@/app/register/context/upload';
import { updateProjectSchema, UpdateProjectSchema } from '@/app/register/form/schema';
import { ProjectSubmission, updateProjectSubmission } from '@/app/register/form/service';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TbEye, TbLink, TbPencil } from 'react-icons/tb';

export default function EditForm(props: { projectSubmission: ProjectSubmission }) {
	const form = useForm<UpdateProjectSchema>({
		resolver: zodResolver(updateProjectSchema),
		defaultValues: props.projectSubmission,
	});

	const [targetVideo, setTargetVideo] = useState<File>();
	const [validVideo, setValidVideo] = useState(false);
	const [targetThumbnail, setTargetThumbnail] = useState<File>();
	const [validThumbnail, setValidThumbnail] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const { addUpload, clearCompleted, hideDialog } = useUploadContext();

	const onSubmit = form.handleSubmit(async (data) => {
		console.log(data);
		const promises = [] as Promise<void>[];

		if (targetVideo && data.files.video) {
			const newBlob = new Blob([targetVideo], { type: targetVideo.type });
			const renamedFile = new File([newBlob], data.files.video, {
				type: targetVideo.type,
			});
			promises.push(addUpload(renamedFile, data.files.video));
		}

		if (targetThumbnail && data.files.thumbnail) {
			const newBlob = new Blob([targetThumbnail], { type: targetThumbnail.type });
			const renamedFile = new File([newBlob], data.files.thumbnail, {
				type: targetThumbnail.type,
			});
			promises.push(addUpload(renamedFile, data.files.thumbnail));
		}

		await Promise.all(promises);
		hideDialog();
		clearCompleted();
		console.log('data...');
		console.log(data);
		await updateProjectSubmission(data);

		form.reset();
		toast({
			title: 'Промените бяха запазени успешно',
			variant: 'sand',
		});
		router.refresh();
	});

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
			form.setValue('files.thumbnail', `${props.projectSubmission.project.title}-Thumbnail-${file.name}`);
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
			form.setValue('files.video', `${props.projectSubmission.project.title}-${file.name}`);
		}
	};

	console.log(form.formState.errors);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit}>
				<div className="flex w-screen max-w-3xl items-start justify-between gap-5">
					<section className="w-1/2 space-y-8">
						<FormField
							control={form.control}
							name="project.title"
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
							name="project.description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Описание на проекта</FormLabel>
									<FormControl>
										<Textarea placeholder="Описвам електродвигателя..." {...field} rows={10} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="project.github"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Git Хранилище</FormLabel>
									<FormControl>
										<Input placeholder="https://..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="project.demo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Линк към демо (незадължително)</FormLabel>
									<FormControl>
										<Input placeholder="https://project.bg" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="bg-sand text-black">
							<TbPencil className="mr-2" /> Запази промените
						</Button>
					</section>
					<div className="w-1/2 space-y-8">
						{!props.projectSubmission.files.video && (
							<section className="space-y-8">
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
													required={false}
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
													required={false}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</section>
						)}
						<section className="text-right">
							{props.projectSubmission.files.images.map((image, index) => (
								<UploadedFile
									key={index}
									title={`Снимка ${index + 1}`}
									name={getFileName(image)}
									path={`${props.projectSubmission.id}/images/${index}`}
								/>
							))}
							{props.projectSubmission.files.video && (
								<UploadedFile
									title="Видео"
									name={getFileName(props.projectSubmission.files.video)}
									path={`${props.projectSubmission.id}/video`}
								/>
							)}
							{props.projectSubmission.files.thumbnail && (
								<UploadedFile
									title="Thumbnail"
									name={getFileName(props.projectSubmission.files.thumbnail)}
									path={`${props.projectSubmission.id}/thumbnail`}
								/>
							)}
							{props.projectSubmission.files.penokarton && (
								<UploadedFile
									title="Пенокартон"
									name={getFileName(props.projectSubmission.files.penokarton)}
									path={`${props.projectSubmission.id}/penokarton`}
								/>
							)}
						</section>
					</div>
				</div>
			</form>
		</Form>
	);
}

function UploadedFile({ title, name, path }: { title: string; name: string; path: string }) {
	return (
		<div className="flex w-full min-w-0 items-center justify-between gap-3">
			<p>{title}</p>
			<Button asChild variant="link" className="text-sand">
				<Link href={`/register/${path}`} target="_blank" className="truncate">
					<TbLink className="mr-2" /> {name}
				</Link>
			</Button>
		</div>
	);
}

function getFileName(dbFileName: string) {
	const start = dbFileName.indexOf('-') + 1;
	return dbFileName.slice(start);
}
