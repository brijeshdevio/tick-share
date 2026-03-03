import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import { UploadFileDto } from './files.types';
import { ensureAccessible } from './files.lib';

@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) { }

  // 1️⃣ Upload File
  async uploadFile(
    ownerId: string,
    file: Express.Multer.File,
    dto: UploadFileDto,
  ) {
    const publicId = nanoid(14);

    const { storageKey } = await this.storage.uploadFile(file);

    return this.prisma.file.create({
      data: {
        publicId,
        ownerId,
        originalName: file.originalname,
        storageKey,
        mimeType: file.mimetype,
        size: file.size,
        visibility: dto.visibility,
        expiresAt: dto.expiresAt,
        maxDownloads: dto.maxDownloads,
      },
      select: {
        publicId: true,
        originalName: true,
        mimeType: true,
        size: true,
        maxDownloads: true,
        visibility: true,
      },
    });
  }

  // 2️⃣ Cursor Pagination
  async getFiles(ownerId: string, cursor?: string, limit = 20) {
    const files = await this.prisma.file.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      where: {
        ownerId,
        expiresAt: { gt: new Date() },
      },
      select: {
        id: true,
        originalName: true,
        mimeType: true,
        size: true,
        maxDownloads: true,
        visibility: true,
        expiresAt: true,
        createdAt: true,
        publicId: true,
      },
    });

    let nextCursor: string | null = null;

    if (files.length > limit) {
      const next = files.pop();
      nextCursor = next!.id;
    }

    return { files, nextCursor };
  }

  // 3️⃣ Get Metadata
  async getMetadata(publicId: string, userId?: string) {
    const file = await this.prisma.file.findUnique({
      where: { publicId },
      select: {
        id: true,
        originalName: true,
        mimeType: true,
        size: true,
        maxDownloads: true,
        visibility: true,
        expiresAt: true,
        createdAt: true,
        publicId: true,
        downloadCount: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!file) throw new NotFoundException(`File not found.`);
    ensureAccessible(file, userId);
    return file;
  }

  // 4️⃣ Preview
  async preview(publicId: string, ownerId?: string) {
    const file = await this.prisma.file.findUnique({
      where: { publicId, ownerId },
    });
    if (!file) throw new NotFoundException(`File not found.`);
    ensureAccessible(file, ownerId);
    const data = this.storage.getPreview(file.storageKey);
    return {
      data,
      mimeType: file.mimeType,
      name: file.originalName,
    };
  }

  // 5️⃣ Download + Increase Count (Transactional)
  async download(publicId: string, userId?: string) {
    return this.prisma.$transaction(async (tx) => {
      const file = await tx.file.findUnique({
        where: { publicId },
      });

      if (!file) throw new NotFoundException();

      ensureAccessible(file, userId);

      // Atomic update (prevents race condition)
      const updated = await tx.file.updateMany({
        where: {
          id: file.id,
          ...(file.maxDownloads && {
            downloadCount: { lt: file.maxDownloads },
          }),
        },
        data: {
          downloadCount: { increment: 1 },
        },
      });

      if (updated.count === 0) {
        throw new ForbiddenException('Download limit reached');
      }

      const data = this.storage.getDownload(file.storageKey);
      return {
        data,
        mimeType: file.mimeType,
        name: file.originalName,
      };
    });
  }

  // 6️⃣ Soft Delete
  async softDelete(publicId: string, userId: string) {
    const file = await this.prisma.file.findUnique({
      where: { publicId },
    });

    if (!file) throw new NotFoundException();
    if (file.ownerId !== userId) throw new ForbiddenException('Not owner');

    return this.prisma.file.update({
      where: { id: file.id },
      data: {
        expiresAt: new Date(),
      },
      select: {
        expiresAt: true,
      },
    });
  }
}
