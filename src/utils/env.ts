import { z } from 'zod';

// Schema of env parsed object
const envSchema = z.object({
  CANONICAL_URL: z.string().default('http://localhost:3000'),
  NODE_ENV: z.string().optional(),
});

export type EnvSchema = z.infer<typeof envSchema>;

// Use this object to validate env file
export const env = envSchema.parse({
  CANONICAL_URL: process.env.NEXT_PUBLIC_CANONICAL_URL,
  NODE_ENV: process.env.NODE_ENV,
});
