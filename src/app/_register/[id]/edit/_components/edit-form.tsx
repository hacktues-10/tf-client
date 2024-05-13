'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IfTfFeatureOn } from '@/app/_integrations/growthbook/components';
import { useUploadContext } from '@/app/_register/context/upload';
import { updateProjectSchema, UpdateProjectSchema } from '@/app/_register/form/schema';
import { ProjectSubmission, updateProjectSubmission } from '@/app/_register/form/service';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
	const [targetImages, setTargetImages] = useState<FileList>();
	const [validImages, setValidImages] = useState(false);
	const [validPenokarton, setValidPenokarton] = useState(false);
	const [targetPenokarton, setTargetPenokarton] = useState<File>();
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

		if (targetImages) {
			for (const file of Array.from(targetImages)) {
				const newBlob = new Blob([file], { type: file.type });
				const renamedFile = new File([newBlob], `${props.projectSubmission.project.title}-${file.name}`, {
					type: file.type,
				});
				promises.push(addUpload(renamedFile, file.name));
			}
		}

		if (targetPenokarton) {
			const newBlob = new Blob([targetPenokarton], { type: targetPenokarton.type });
			const renamedFile = new File(
				[newBlob],
				`${props.projectSubmission.project.title}-Penokarton-${targetPenokarton.name}`,
				{
					type: targetPenokarton.type,
				}
			);
			promises.push(addUpload(renamedFile));
		}

		await Promise.all(promises);
		hideDialog();
		clearCompleted();
		console.log('data...');
		console.log(data);
		await updateProjectSubmission(data);

		setTargetImages(undefined);
		setTargetVideo(undefined);
		setTargetThumbnail(undefined);
		setTargetPenokarton(undefined);
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
			const filesArray = Array.from(e.target.files).map(
				(file) => `${props.projectSubmission.project.title}-${file.name}`
			);
			form.setValue('files.images', filesArray);
			setValidImages(true);
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
			form.setValue('files.penokarton', `${props.projectSubmission.project.title}-Penokarton-${file.name}`);
		}
	};

	console.log(form.formState.errors);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit}>
				<div className="flex w-screen max-w-3xl flex-col items-center justify-center gap-5 sm:flex-row sm:items-start sm:justify-between">
					<section className="w-full space-y-8 sm:w-1/2">
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
							name="project.type"
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
						<Accordion type="single" collapsible>
							<AccordionItem value="contributors">
								<AccordionTrigger>Участници</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-8">
										{props.projectSubmission.contributors.map((contributor, index) => (
											<div
												key={JSON.stringify(contributor)}
												className="flex w-full flex-col justify-between gap-3"
											>
												<h2 className="font-semibold">Участник {index + 1}</h2>
												<FormField
													control={form.control}
													name={`contributors.${index}.email`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Имейл (elsys)</FormLabel>
															<FormControl>
																<Input
																	placeholder="uchenik.2024@elsys-bg.org"
																	{...field}
																	disabled={index === 0}
																/>
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
															<FormLabel>Име</FormLabel>
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
													name={`contributors.${index}.grade`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Клас</FormLabel>
															<FormControl>
																<Select
																	onValueChange={field.onChange}
																	value={field.value}
																>
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
																<Select
																	onValueChange={field.onChange}
																	value={field.value}
																>
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
											</div>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Button type="submit" className="bg-sand text-black" disabled={form.formState.isSubmitting}>
							<TbPencil className="mr-2" /> Запази промените
						</Button>
					</section>
					<div className="w-full space-y-8 sm:w-1/2">
						<section className="space-y-8">
							<FormField
								control={form.control}
								name="files.video"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="mt-8">Ново Видео</FormLabel>
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
										<FormLabel className="mt-8">Нов Thumbnail</FormLabel>
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
							<FormField
								control={form.control}
								name="files.images"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Нови Снимки</FormLabel>
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
						</section>
						<IfTfFeatureOn feature="tf-register-projects">
							<section className="space-y-8">
								<FormField
									control={form.control}
									name="files.penokarton"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="mt-8">
												Смяна на Пенокартон (размер А2, pdf формат)
											</FormLabel>
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
							</section>
						</IfTfFeatureOn>
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
									name={getFileName(props.projectSubmission.files.thumbnail, 2)}
									path={`${props.projectSubmission.id}/thumbnail`}
								/>
							)}
							{props.projectSubmission.files.penokarton && (
								<UploadedFile
									title="Пенокартон"
									name={getFileName(props.projectSubmission.files.penokarton, 2)}
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
				<Link href={`/register/${path}/${encodeURIComponent(name)}`} target="_blank" className="truncate">
					<TbLink className="mr-2" /> {name}
				</Link>
			</Button>
		</div>
	);
}

function getFileName(dbFileName: string, iterations: number = 1) {
	while (iterations > 0) {
		const start = dbFileName.indexOf('-') + 1;
		dbFileName = dbFileName.slice(start);
		iterations--;
	}
	return dbFileName;
}
