'use client';

import { z } from 'zod';

const STUDENT_PARALELS = ['А', 'Б', 'В', 'Г'] as const;
const STUDENT_GRADES = ['8', '9', '10', '11', '12'] as const;
const MAX_FILE_SIZE = 5000000 as const;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const;

const ImageValidation = z.object({
	image: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Само .jpg, .jpeg, .png and .webp файлови формати са поддържани.'
		),
});

const VideoValidation = z.object({
	video: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max video size is 5MB.`)
		.refine((file) => file?.type === 'video/mp4', 'Само формат .mp4 е поддържан.'),
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
	firstName: z.string().min(2).max(50, { message: 'Невалидно име' }),
	lastName: z.string().min(2).max(50, { message: 'Невалидна фамилия' }),
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
	title: z.string().min(2).max(50, { message: 'Невалидно име на проекта' }),
	description: z.string().min(2).max(500, { message: 'Невалидно описание на проекта' }),
	github: z.string().url({ message: 'Невалиден GitHub URL' }),
});

const registrationSchema = contributorSchema.merge(projectSchema);

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export { registrationSchema, contributorSchema, projectSchema };
