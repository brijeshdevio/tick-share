import { nanoid } from "nanoid";
import { prisma } from "../../config";
import { StorageService } from "../storage/storage.service";
import { ForbiddenException, NotFoundException } from "../../common";
import { ensureAccessible } from "./files.lib";
import { UploadFileDto } from "./files.types";

export class FilesService {
  private readonly prisma: typeof prisma;
  private readonly storage = new StorageService();
  constructor() {
    this.prisma = prisma;
    this.storage = new StorageService();
  }

  uploadFile = async (
    ownerId: string,
    data: UploadFileDto,
    file: Express.Multer.File,
  ) => {
    const shareToken = nanoid(14);
    const { storageId } = await this.storage.uploadFile(file);
    if (!data.expiresAt) data.expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    return this.prisma.file.create({
      data: {
        shareToken,
        ownerId,
        originalName: data.name ?? file.originalname,
        storageId,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        expiresAt: data.expiresAt,
        maxDownloads: data.maxDownloads,
      },
      select: {
        shareToken: true,
        originalName: true,
        mimeType: true,
        sizeBytes: true,
        maxDownloads: true,
      },
    });
  };

  findMany = async (ownerId: string, cursor?: string, limit = 20) => {
    const files = await this.prisma.file.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      where: {
        ownerId,
        expiresAt: { gt: new Date() },
      },
      select: {
        id: true,
        originalName: true,
        mimeType: true,
        sizeBytes: true,
        maxDownloads: true,
        expiresAt: true,
        createdAt: true,
        shareToken: true,
      },
    });

    let nextCursor: string | null = null;

    if (files.length > limit) {
      const next = files.pop();
      nextCursor = next!.id;
    }

    return { files, nextCursor };
  };

  findOne = async (shareToken: string) => {
    const file = await this.prisma.file.findUnique({
      where: { shareToken },
      select: {
        id: true,
        originalName: true,
        mimeType: true,
        sizeBytes: true,
        maxDownloads: true,
        expiresAt: true,
        createdAt: true,
        shareToken: true,
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
    ensureAccessible(file);
    return file;
  };

  previewFile = async (shareToken: string) => {
    const file = await this.prisma.file.findUnique({
      where: { shareToken },
      select: {
        storageId: true,
        mimeType: true,
        originalName: true,
        expiresAt: true,
        owner: {
          select: { id: true },
        },
      },
    });
    if (!file) throw new NotFoundException(`File not found.`);
    ensureAccessible(file);
    const data = this.storage.getPreview(file.storageId);
    return {
      data,
      mimeType: file.mimeType,
      name: file.originalName,
    };
  };

  downloadFile = async (shareToken: string) => {
    return this.prisma.$transaction(async (tx) => {
      const file = await tx.file.findUnique({
        where: { shareToken },
        select: {
          id: true,
          storageId: true,
          originalName: true,
          mimeType: true,
          maxDownloads: true,
          expiresAt: true,
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!file) throw new NotFoundException("File not found.");

      ensureAccessible(file);

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
        throw new ForbiddenException("Download limit reached");
      }

      const data = this.storage.getDownload(file.storageId);
      return {
        data,
        mimeType: file.mimeType,
        name: file.originalName,
      };
    });
  };

  deleteFile = async (id: string, ownerId: string) => {
    const file = await this.prisma.file.findUnique({
      where: { id, ownerId },
      select: {
        ownerId: true,
      },
    });

    if (!file) throw new ForbiddenException("Access denied.");

    return this.prisma.file.update({
      where: { id, ownerId },
      data: {
        expiresAt: new Date(),
      },
      select: {
        expiresAt: true,
      },
    });
  };
}
