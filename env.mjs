import { createEnv } from "@t3-oss/env-nextjs";
import {z} from "zod";
export const env = createEnv({
    server: {
      VERCEL_ENV: z
        .enum(["development", "preview", "production"])
        .optional()
        .default("development"),
    },

    client: {
      NEXT_PUBLIC_GROWTHBOOK_API_HOST: z.string().url(),
      NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z.string(),
    },
    experimental__runtimeEnv: {
      NEXT_PUBLIC_GROWTHBOOK_API_HOST:
        process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
      NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY:
        process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    },
  });