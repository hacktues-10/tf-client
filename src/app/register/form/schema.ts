'use client';

import { z } from 'zod';

const STUDENT_PARALELS = ['А', 'Б', 'В', 'Г'] as const;
const STUDENT_GRADES = ['8', '9', '10', '11', '12'] as const;
const MAX_FILE_SIZE = 5242880 as const;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const;

// .refine((url) => {
// 	console.log(url);
// 	return true;
// }, 'Your error message here')

const ImagesValidation = z.object({
	images: z
		.array(
			z
				.object({
					name: z.string(),
					size: z.number(),
					type: z.string(),
					lastModified: z.number(),
				})
				.refine((url) => {
					console.log(url);
					return true;
				}, 'Your error message here')
				.refine((file) => {
					return ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]);
				}, 'Невалиден формат на снимка')
				.refine((file) => {
					return file.size <= MAX_FILE_SIZE;
				}, 'Снимката трябва да е по-малка от 5MB')
		)
		.min(1, { message: 'Трябва да качите поне 1 снимка' })
		.max(5, { message: 'Можете да качите максимум 5 снимки' }),
});

const VideoValidation = z.object({
	video: z
		.object({
			name: z.string(),
			size: z.number(),
			type: z.string(),
			lastModified: z.number(),
		})
		.refine((file) => {
			return file.type !== '';
		}, 'Трябва да качите видео задължително')
		.refine((file) => {
			return file.type === 'video/mp4';
		}, 'Невалиден формат на видео'),
});

const contributorSchema = z.object({
	email: z
		.string()
		.email()
		.refine(
			(value) =>
				[
					'2019@elsys-bg.org',
					'2020@elsys-bg.org',
					'2021@elsys-bg.org',
					'2022@elsys-bg.org',
					'2023@elsys-bg.org',
				].some((suffix) => value.endsWith(suffix)),
			{ message: 'Невалиден имейл' }
		),
	firstName: z
		.string()
		.min(3, { message: 'Името трябва да е поне 3 символа' })
		.max(20, { message: 'Името трябва да е до 20 символа' })
		.refine((name) => /^[А-Я][а-я]*$/.test(name), 'Името трябва да е на кирилица и да започва с главна буква'),

	lastName: z
		.string()
		.min(3, { message: 'Фамилията трябва да е поне 3 символа' })
		.max(20, { message: 'Фамилията трябва да е до 20 символа' })
		.refine((name) => /^[А-Я][а-я]*$/.test(name), 'Фамилията трябва да е на кирилица и да започва с главна буква'),
	grade: z.enum(STUDENT_GRADES),
	parallel: z.enum(STUDENT_PARALELS),
	phoneNumber: z.preprocess(
		(val) => (typeof val === 'string' ? val.replace(/^\+359/, '0').replace(/\s/g, '') : val),
		z
			.string()
			.regex(/^\d+$/, {
				message: 'Телефонният номер трябва да съдържа само цифри',
			})
			.regex(/^0/, { message: 'Невалиден мобилен телефонен номер' })
			.length(10, {
				message: 'Телефонният номер трябва да съдържа точно 10 цифри',
			})
	),
});

const projectSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Името на проекта трянва да е дълго поне 3 символа.' })
		.max(50, { message: 'Името на проекта трябва да е до 50 символа.' })
		.refine((title) => /^[A-Z0-9А-Я]/.test(title), 'Името на проекта трябва да започва с главна буква или число'),
	description: z
		.string()
		.min(10, { message: 'Невалидно описание на проекта. Трянва да е дълго поне 10 символа.' })
		.max(500, { message: 'Невалидно описание на проекта' }),
	github: z
		.string()
		.url({ message: 'Невалиден URL' })
		.refine((url) => url.startsWith('https://github.com/'), 'Невалиден GitHub линк'),
});

const fileUploadSchema = ImagesValidation.merge(VideoValidation);

const registrationSchema = contributorSchema.merge(projectSchema).merge(fileUploadSchema);

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export { registrationSchema, contributorSchema, projectSchema, fileUploadSchema };
