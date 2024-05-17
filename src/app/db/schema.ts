import { bigint, boolean, integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const typeEnum = pgEnum('type', ['Софтуер', 'Хардуер', 'Battle Bots', 'Компютърни мрежи']);

export const projectsSubmission = pgTable('projects_submission', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull().unique(),
	penokarton: varchar('penokarton'),
	demo: varchar('demo'),
	description: varchar('description').notNull(),
	github: varchar('github').notNull(),
	type: typeEnum('type'),
	images: varchar('images').notNull(),
	thumbnail: varchar('thumbnail').notNull(),
	video: varchar('video').notNull(),
	contributors: varchar('contributors').notNull(),
	youtubeId: varchar('youtube_id').unique(),
	videoDurationSec: bigint('video_duration_sec', { mode: 'bigint' }),
	shoudUpload: boolean('shoud_upload').default(true).notNull(),
});

export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull().unique(),
	penokarton: varchar('penokarton'),
	demo: varchar('demo'),
	description: varchar('description').notNull(),
	github: varchar('github').notNull(),
	type: typeEnum('type'),
	images: varchar('images').notNull(),
	thumbnail: varchar('thumbnail').notNull(),
	video: varchar('video').notNull(),
	contributors: varchar('contributors').notNull(),
	youtubeId: varchar('youtube_id').unique(),
	submissionId: integer('submission_id').references(() => projectsSubmission.id),
});
