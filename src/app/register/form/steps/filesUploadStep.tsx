import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { number, z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fileUploadSchema } from '../schema';
import { Textarea } from '@/components/ui/textarea';
import StepButtons from './stepButtons';
import { useEffect, useState } from 'react';

type FileUploadSchema = z.infer<typeof fileUploadSchema>;
import Image from 'next/image';

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
	type ImagesTypes = Array<File>;
	const form = useForm<FileUploadSchema>({
		resolver: zodResolver(fileUploadSchema),
		defaultValues: {
			images: Array<File>(),
			video: null,
		},
	});

	function onSubmit(values: FileUploadSchema) {
		console.log(values);
	}

	const [selectedFile, setSelectedFile] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (e.target.files && e.target.files.length > 5) {
				alert('You can only upload a maximum of 5 files');
				e.target.value = '';
				return;
			}
			const filesArray = Array.from(e.target.files);
			form.setValue('images', filesArray);
		}
	};

	const handleVideoChange = (e: any) => {
		const file = e.target.files?.[0];

		if (file.type === 'video/mp4' && file.size <= 5242880) {
			console.log(file instanceof File);
			form.setValue('video', file);
		} else {
			console.log('Invalid file');
			form.setValue('video', '');
		}
	};

	const handleRemoveClick = () => {
		setSelectedFile(null);
	};

	useEffect(() => {
		console.log(selectedFile);
	}, [selectedFile]);

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
					{selectedFile && (
						<div className="mt-2 relative">
							<Image src={selectedFile} alt="Preview" width={500} height={500} />
							<button
								onClick={handleRemoveClick}
								className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2"
								aria-label="Remove image"
							>
								X
							</button>
						</div>
					)}
					<StepButtons onPrev={onPrev} onNext={() => onNext(form.getValues())} />
				</form>
			</Form>
		</div>
	);
}
