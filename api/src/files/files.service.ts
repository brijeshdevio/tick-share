import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { randomString } from '../lib';
import { UploadFileDto } from './files.types';

@Injectable()
export class FilesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async upload(userId: string, body: UploadFileDto, file: Express.Multer.File) {
    const hashKey = randomString(6);
    const { $id, sizeOriginal, name, mimeType } =
      await this.storageService.upload(file);
    body.name = body.name ?? name;
    await this.prismaService.file.create({
      data: {
        userId,
        name: body.name ?? name,
        description: body.description,
        visibility: body.visibility,
        expiresAt: body.expiresAt,
        size: sizeOriginal,
        hashKey,
        storageId: $id,
        mimeType: mimeType,
      },
    });
    return {
      id: hashKey,
      name: body,
      size: sizeOriginal,
      mimeType,
      visibility: body.visibility,
      expiresAt: body.expiresAt,
    };
  }

  async findAll(userId: string) {
    const files = await this.prismaService.file.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        size: true,
        expiresAt: true,
        visibility: true,
        hashKey: true,
      },
    });
    return { files };
  }

  async previewPublic(hashKey: string) {
    const file = await this.prismaService.file.findFirst({
      where: { hashKey, visibility: 'PUBLIC', expiresAt: { gt: new Date() } },
      select: { storageId: true, mimeType: true, name: true },
    });
    if (!file) {
      throw new ForbiddenException('File not found.');
    }
    const data = await this.storageService.preview(file.storageId);
    return {
      data,
      mimeType: file.mimeType,
      name: file.name,
    };
  }
}
