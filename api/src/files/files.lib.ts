import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '../constants';
import { envConfig } from '../config';

export const getUrl = (imgId: string): string => {
  return `${envConfig.APP_URL}/files/${imgId}`;
};

export const ensureAccessible = (file: any, userId?: string) => {
  if (file.expiresAt < new Date()) {
    throw new ForbiddenException('File expired');
  }

  if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
    throw new ForbiddenException('Download limit reached');
  }

  if (file.visibility === 'PRIVATE') {
    if (!userId || file.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }
  }
};

export const fileValidation = async (
  file: Express.Multer.File,
): Promise<void> => {
  if (!file) {
    throw new BadRequestException('File is required.');
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
    throw new BadRequestException('Invalid file signature.');
  }

  return type.mime;
};
