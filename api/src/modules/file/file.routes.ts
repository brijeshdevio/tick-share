import { Router } from "express";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import {
  authMiddleware,
  optionalAuthMiddleware,
  zodValidationMiddleware,
} from "../../common/middlewares";
import { UploadFileSchema } from "./file.schema";
import { upload } from "../../config";
import { asyncHandler } from "../../common/errors";

export const fileRoutes = Router();
const fileController = new FileController(new FileService());

fileRoutes.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  zodValidationMiddleware(UploadFileSchema, "body"),
  asyncHandler(fileController.upload),
);
fileRoutes.get("/", authMiddleware, fileController.findMany);
fileRoutes.get(
  "/:publicId/metadata",
  optionalAuthMiddleware,
  asyncHandler(fileController.findOne),
);
fileRoutes.get(
  "/:publicId/preview",
  optionalAuthMiddleware,
  asyncHandler(fileController.previewFile),
);
fileRoutes.get(
  "/:publicId/download",
  optionalAuthMiddleware,
  asyncHandler(fileController.downloadFile),
);
fileRoutes.delete("/:id", authMiddleware, asyncHandler(fileController.delete));
