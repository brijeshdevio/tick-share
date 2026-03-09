import { Router } from "express";
import { authMiddleware, zodValidation } from "../../middlewares";
import { asyncHandler } from "../../common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginSchema, RegisterSchema } from "./auth.schema";

const authController = new AuthController(new AuthService());
export const authRouter = Router();

authRouter.post(
  "/register",
  zodValidation(RegisterSchema),
  asyncHandler(authController.register),
);
authRouter.post(
  "/login",
  zodValidation(LoginSchema),
  asyncHandler(authController.login),
);

authRouter.get("/me", authMiddleware, asyncHandler(authController.getUser));
authRouter.post("/logout", authMiddleware, authController.logout);
