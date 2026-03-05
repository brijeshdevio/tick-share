import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { asyncHandler } from "../../common/errors";

export const userRoutes = Router();
const userController = new UserController(new UserService());

userRoutes.get("/me", asyncHandler(userController.findById));
