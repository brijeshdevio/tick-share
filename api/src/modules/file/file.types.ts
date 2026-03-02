import z from "zod";
import { UploadFileSchema } from "./file.schema";

// ================ DTOs =================

export type UploadFileDto = z.infer<typeof UploadFileSchema>;
