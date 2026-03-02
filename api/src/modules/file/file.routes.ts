import { Router } from "express";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import {
  authMiddleware,
  optionalAuthMiddleware,
  zodValidationMiddleware,
} from "@/common/middlewares";
import { UploadFileSchema } from "./file.schema";
import { upload } from "@/config";

export const fileRoutes = Router();
const fileController = new FileController(new FileService());

fileRoutes.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  zodValidationMiddleware(UploadFileSchema, "body"),
  fileController.upload,
);
fileRoutes.get("/", authMiddleware, fileController.findMany);
fileRoutes.get(
  "/:publicId/metadata",
  optionalAuthMiddleware,
  fileController.findOne,
);
fileRoutes.get(
  "/:publicId/preview",
  optionalAuthMiddleware,
  fileController.previewFile,
);
fileRoutes.get(
  "/:publicId/download",
  optionalAuthMiddleware,
  fileController.downloadFile,
);
fileRoutes.delete("/:id", authMiddleware, fileController.delete);
