import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
export const env = createEnv({
	server: {
		VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional().default('development'),
		API_TOKEN_BACKEND: z.string().optional(),
		NEXT_AUTH_SECRET: z.string(),
		POSTGRES_URL: z.string().url(),
	},

	client: {
		NEXT_PUBLIC_GROWTHBOOK_API_HOST: z.string().url(),
		NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z.string(),
		// API_TOKEN_IMAGES: z.string(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
		NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
	},
});
