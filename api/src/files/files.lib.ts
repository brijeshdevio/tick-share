import { BadRequestException } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';
import { envConfig } from '../config';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '../constants';

export const getUrl = (imgId: string): string => {
  return `${envConfig.APP_URL}/files/${imgId}`;
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
