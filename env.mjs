import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		NEXT_AUTH_SECRET: z.string(),
		POSTGRES_URL: z.string().url(),
	},

	client: {},
	experimental__runtimeEnv: {},
});
