import { ID } from "node-appwrite";
import { InternalServerErrorException } from "../../common/errors";
import { env, storage } from "../../config";

export class StorageService {
  async uploadFile(file: Express.Multer.File): Promise<{ storageKey: string }> {
    try {
      const uploadedFile = await storage.createFile({
        file: new File([new Uint8Array(file.buffer)], file.originalname, {
          type: file.mimetype,
        }),
        bucketId: env.APPWRITE_BUCKET_ID,
        fileId: ID.unique(),
      });

      return { storageKey: uploadedFile.$id };
    } catch (error) {
      throw new InternalServerErrorException("Storage upload failed");
    }
  }

  async getPreview(storageKey: string): Promise<ArrayBuffer> {
    return await storage.getFileDownload(env.APPWRITE_BUCKET_ID, storageKey);
  }

  async getDownload(storageKey: string): Promise<ArrayBuffer> {
    return await storage.getFileDownload(env.APPWRITE_BUCKET_ID, storageKey);
  }

  async deleteFile(storageKey: string): Promise<void> {
    await storage.deleteFile(env.APPWRITE_BUCKET_ID, storageKey);
  }
}
