import { fileTypeFromBuffer } from "file-type";
import { BadRequestException, ForbiddenException } from "@/common/errors";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from "@/constants";
import { env } from "@/config";

export const getUrl = (publicId: string): string => {
  return `${env.APP_URL}/files/${publicId}/metadata`;
};

export const fileValidation = async (
  file?: Express.Multer.File,
): Promise<void> => {
  if (!file) {
    throw new BadRequestException("File is required.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new BadRequestException(
      `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    );
  }

  await validateFileSignature(file.buffer);

  const allAllowedTypes = Object.values(ALLOWED_MIME_TYPES).flat();

  if (!allAllowedTypes.includes(file.mimetype)) {
    throw new BadRequestException(`Unsupported file type: ${file.mimetype}`);
  }
};

export const validateFileSignature = async (buffer: Buffer) => {
  const type = await fileTypeFromBuffer(buffer);

  if (!type) {
    throw new BadRequestException("Invalid file signature.");
  }

  return type.mime;
};

export const ensureAccessible = (file: any, ownerId?: string) => {
  if (file.expiresAt < new Date()) {
    throw new ForbiddenException("File expired");
  }

  if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
    throw new ForbiddenException("Download limit reached");
  }

  if (file.visibility === "PRIVATE") {
    if (!ownerId || file?.owner?.id !== ownerId) {
      throw new ForbiddenException("Access denied");
    }
  }
};
