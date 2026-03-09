import z from "zod";
import { LoginSchema, RegisterSchema } from "./auth.schema";

// ================ DTOs =================

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
