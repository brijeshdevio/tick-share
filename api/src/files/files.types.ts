import z from 'zod';
import { UploadFileSchema } from './schema';

export type UploadFileDto = z.infer<typeof UploadFileSchema>;
