import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load environmental variables from root .env or local server .env
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  RAZORPAY_KEY_ID: z.string().optional().default('mock_key_id'),
  RAZORPAY_KEY_SECRET: z.string().optional().default('mock_key_secret'),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional().default('mock_webhook_secret'),
  CLOUDINARY_URL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
