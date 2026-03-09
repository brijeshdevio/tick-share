import { Router } from "express";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.services";
import { fileValidationMiddleware } from "./files.middlewares";
import { asyncHandler } from "../../common";
import { authMiddleware } from "../../middlewares";

export const filesRouter = Router();
const filesController = new FilesController(new FilesService());

filesRouter.post(
  "/upload",
  fileValidationMiddleware,
  asyncHandler(filesController.uploadFile),
);
filesRouter.get("/", authMiddleware, asyncHandler(filesController.findMany));
filesRouter.get("/:shareToken/metadata", asyncHandler(filesController.findOne));
filesRouter.get(
  "/:shareToken/preview",
  asyncHandler(filesController.previewFile),
);
filesRouter.get(
  "/:shareToken/download",
  asyncHandler(filesController.downloadFile),
);
filesRouter.delete(
  "/:id",
  authMiddleware,
  asyncHandler(filesController.deleteFile),
);
