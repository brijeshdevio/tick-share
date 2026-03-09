import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { filesRouter } from "../modules/files/files.routes";

export const routes = Router();
routes.use("/auth", authRouter);
routes.use("/files", filesRouter);
