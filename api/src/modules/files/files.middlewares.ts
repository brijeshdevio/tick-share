import { NextFunction, Request, Response } from "express";
import { fileTypeFromBuffer } from "file-type";
import { BadRequestException } from "../../common";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from "../../constants";

export const validateFileSignature = async (buffer: Buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new BadRequestException(
      "File buffer is empty. Unable to detect file signature.",
    );
  }

  const type = await fileTypeFromBuffer(buffer);

  if (!type) {
    throw new BadRequestException(
      "Unable to determine file type from its binary signature. The file may be corrupted or use an unsupported format.",
    );
  }

  return type.mime;
};

export const fileValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.file;
    if (!file) {
      throw new BadRequestException(
        "No file was uploaded. Please attach a file and try again.",
      );
    }

    if (!file.buffer) {
      throw new BadRequestException(
        "Uploaded file buffer is missing. This may indicate an upload processing error.",
      );
    }

    if (!file.size || file.size === 0) {
      throw new BadRequestException(
        "Uploaded file is empty. Please upload a valid file.",
      );
    }

    if (!MAX_FILE_SIZE || MAX_FILE_SIZE <= 0) {
      throw new BadRequestException(
        "Server configuration error: MAX_FILE_SIZE is not properly defined.",
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the maximum allowed limit of ${
          MAX_FILE_SIZE / 1024 / 1024
        }MB.`,
      );
    }

    const detectedMime = await validateFileSignature(file.buffer);

    const allAllowedTypes = Object.values(ALLOWED_MIME_TYPES).flat();

    if (!allAllowedTypes.length) {
      throw new BadRequestException(
        "Server configuration error: No allowed MIME types are defined.",
      );
    }

    if (!allAllowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Unsupported file type '${file.mimetype}'. Allowed types: ${allAllowedTypes.join(
          ", ",
        )}.`,
      );
    }

    if (detectedMime !== file.mimetype) {
      throw new BadRequestException(
        `File content type mismatch. Detected file signature '${detectedMime}' does not match the provided MIME type '${file.mimetype}'.`,
      );
    }
  } catch (error) {
    throw error;
  }
  next();
};
