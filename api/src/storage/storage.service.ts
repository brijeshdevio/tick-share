import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import { storage, envConfig } from '../config';

@Injectable()
export class StorageService {
  async uploadFile(file: Express.Multer.File): Promise<{ storageKey: string }> {
    try {
      const uploadedFile = await storage.createFile({
        file: InputFile.fromBuffer(file.buffer, file.originalname),
        bucketId: envConfig.APPWRITE_BUCKET_ID,
        fileId: ID.unique(),
      });

      return { storageKey: uploadedFile.$id };
    } catch {
      throw new InternalServerErrorException('Storage upload failed');
    }
  }

  async getPreview(storageKey: string): Promise<ArrayBuffer> {
    return storage.getFilePreview(envConfig.APPWRITE_BUCKET_ID, storageKey);
  }

  async getDownload(storageKey: string): Promise<ArrayBuffer> {
    return storage.getFileDownload(envConfig.APPWRITE_BUCKET_ID, storageKey);
  }

  async deleteFile(storageKey: string): Promise<void> {
    await storage.deleteFile(envConfig.APPWRITE_BUCKET_ID, storageKey);
  }
}
