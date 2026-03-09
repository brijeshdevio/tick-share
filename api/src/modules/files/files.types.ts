import z from "zod";
import { UploadFileSchema } from "./files.schema";

// ================ DTOs =================

export type UploadFileDto = z.infer<typeof UploadFileSchema>;
