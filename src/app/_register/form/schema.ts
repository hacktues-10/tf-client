'use client';

import { error } from 'console';

import { z } from 'zod';

const STUDENT_PARALELS = ['А', 'Б', 'В', 'Г'] as const;
const STUDENT_GRADES = ['8', '9', '10', '11', '12'] as const;
const MAX_FILE_SIZE = 5242880 as const;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const;

// .refine((url) => {
// 	console.log(url);
// 	return true;
// }, 'Your error message here')

const filesSchema = z.object({
	files: z.object({
		images: z.array(z.string()),
		video: z.string().optional(),
		thumbnail: z.string().optional(),
		penokarton: z.string(),
	}),
});

const contributorSchema = z.object({
	contributors: z.array(
		z.object({
			email: z
				.string()
				.email({ message: 'Невалиден имейл' })
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
				.refine(
					(name) => /^[А-Я][а-я-]*[А-Я]*[а-я-]*$/.test(name),
					'Името трябва да е на кирилица и да започва с главна буква'
				),

			lastName: z
				.string()
				.min(3, { message: 'Фамилията трябва да е поне 3 символа' })
				.max(20, { message: 'Фамилията трябва да е до 20 символа' })
				.refine(
					(name) => /^[А-Я][а-я]*$/.test(name),
					'Фамилията трябва да е на кирилица и да започва с главна буква'
				),
			grade: z.enum(STUDENT_GRADES, {
				errorMap: (issue, ctx) => ({ message: 'Невалиден клас' }),
			}),
			parallel: z.enum(STUDENT_PARALELS, {
				errorMap: (issue, ctx) => ({ message: 'Невалидна паралелка' }),
			}),
			tshirt: z.enum(['S', 'M', 'L', 'XL', 'XXL'], {
				errorMap: (issue, ctx) => ({ message: 'Невалиден размер на тениската' }),
			}),
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
		})
	),
});

const projectSchema = z.object({
	project: z.object({
		title: z
			.string()
			.min(3, { message: 'Името на проекта трябва да е дълго поне 3 символа.' })
			.max(50, { message: 'Името на проекта трябва да е до 50 символа.' }),
		description: z
			.string()
			.min(10, { message: 'Невалидно описание на проекта. Трябва да е дълго поне 10 символа.' })
			.max(4096, { message: 'Твърде дълго описание на проекта.' }),
		github: z.string().url({ message: 'Невалиден URL' }),
		type: z.enum(['Софтуер', 'Хардуер', 'Battle Bots', 'Компютърни мрежи'], {
			errorMap: (issue, ctx) => ({ message: 'Невалиден тип на проекта' }),
		}),
		demo: z.string().optional(),
	}),
});

const registrationSchema = projectSchema.merge(contributorSchema).merge(filesSchema);
export type RegistrationSchema = z.infer<typeof registrationSchema>;

const updateProjectSchema = z
	.object({
		id: z.number(),
	})
	.merge(registrationSchema);
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export { filesSchema, registrationSchema, contributorSchema, projectSchema, updateProjectSchema };
