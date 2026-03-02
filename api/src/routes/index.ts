import { Router } from "express";
import { authMiddleware } from "@/common/middlewares";
import { authRoutes } from "@/modules/auth";
import { userRoutes } from "@/modules/user";
import { fileRoutes } from "@/modules/file";

export const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/users", authMiddleware, userRoutes);
routes.use("/files", fileRoutes);
