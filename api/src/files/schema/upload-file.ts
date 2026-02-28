import { z } from 'zod';

const expirationOptions = [
  '15_MINUTES',
  '30_MINUTES',
  '1_HOUR',
  '6_HOURS',
  '12_HOURS',
  '24_HOURS',
  '3_DAYS',
  '7_DAYS',
] as const;

const expirationToDate = (expiration: (typeof expirationOptions)[number]) => {
  const now = new Date();
  const map: Record<(typeof expirationOptions)[number], number> = {
    '15_MINUTES': 15 * 60 * 1000,
    '30_MINUTES': 30 * 60 * 1000,
    '1_HOUR': 60 * 60 * 1000,
    '6_HOURS': 6 * 60 * 60 * 1000,
    '12_HOURS': 12 * 60 * 60 * 1000,
    '24_HOURS': 24 * 60 * 60 * 1000,
    '3_DAYS': 3 * 24 * 60 * 60 * 1000,
    '7_DAYS': 7 * 24 * 60 * 60 * 1000,
  };

  return new Date(now.getTime() + map[expiration]);
};

export const UploadFileSchema = z
  .object({
    name: z.string().min(3).max(30).optional(),
    visibility: z.enum(['PRIVATE', 'PUBLIC']).default('PUBLIC'),
    description: z.string().max(50).optional(),
    expiresAt: z
      .enum(expirationOptions)
      .transform((value) => expirationToDate(value))
      .default(expirationToDate('30_MINUTES')),
  })
  .strict();
