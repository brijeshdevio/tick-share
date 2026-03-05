import { Router } from "express";
import {
  authMiddleware,
  zodValidationMiddleware,
} from "../../common/middlewares";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginSchema, RegisterSchema } from "./auth.schem";
import { asyncHandler } from "../../common/errors";

export const authRoutes = Router();
const authController = new AuthController(new AuthService());

authRoutes.post(
  "/register",
  zodValidationMiddleware(RegisterSchema, "body"),
  asyncHandler(authController.register),
);
authRoutes.post(
  "/login",
  zodValidationMiddleware(LoginSchema, "body"),
  asyncHandler(authController.login),
);
authRoutes.post("/logout", authMiddleware, authController.logout);
