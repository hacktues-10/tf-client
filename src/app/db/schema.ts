import { relations } from 'drizzle-orm';
import {
	bigint,
	boolean,
	date,
	index,
	integer,
	pgEnum,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

import { db } from '.';

export const typeEnum = pgEnum('type', ['Софтуер', 'Хардуер', 'Battle Bots', 'Компютърни мрежи']);

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: varchar('email').notNull(),
	emailVerified: date('email_verified', { mode: 'date' }),
	participantId: serial('participant_id'),
});

export const accounts = pgTable('accounts', {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar('user_id').notNull(),
	type: varchar('type').notNull(),
	provider: varchar('provider').notNull(),
	providerAccountId: varchar('provider_account_id').notNull(),
	refresh_token: varchar('refresh_token'),
	access_token: varchar('access_token'),
	created_at: timestamp('created_at').defaultNow().notNull(),
	expires_at: integer('expires_at'),
	token_type: varchar('token_type'),
	scope: varchar('scope'),
	id_token: varchar('id_token'),
	session_state: varchar('session_state'),
});

export const sessions = pgTable('sessions', {
	id: varchar('id').primaryKey().notNull(),
	userId: integer('user_id').notNull(),
	expires: date('expires', { mode: 'date' }).notNull(),
	sessionToken: varchar('session_token').notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
	identifier: varchar('identifier').notNull(),
	token: varchar('token').notNull(),
	expires: date('expires', { mode: 'date' }).notNull(),
});

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

export const projectRelations = relations(projects, ({ one }) => ({
	projectsSubmission: one(projectsSubmission, {
		fields: [projects.submissionId],
		references: [projectsSubmission.id],
	}),
}));

export const voters = pgTable(
	'voters',
	{
		// ulid
		id: varchar('id').primaryKey(),
		createIpHash: varchar('create_ip_hash').notNull(),
		email: varchar('email').notNull(),
		name: varchar('name').notNull(),
		emailHash: varchar('email_hash').notNull().unique(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		isVerified: boolean('is_verified').default(false).notNull(),
	},
	(t) => ({
		emailHashIndex: index().on(t.emailHash),
	})
);

export const votes = pgTable('votes', {
	id: serial('id').primaryKey(),
	voterId: varchar('voter_id').references(() => voters.id),
	projectId: integer('project_id').references(() => projects.id),
	votedAt: timestamp('voted_at').defaultNow().notNull(),
	ipHash: varchar('ip_hash').notNull(),
	isBlocked: boolean('is_blocked').default(false).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DrizzleClient = typeof db;
