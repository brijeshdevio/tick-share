import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

export const userRoutes = Router();
const userController = new UserController(new UserService());

userRoutes.get("/me", userController.findById);
