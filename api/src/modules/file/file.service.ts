import { nanoid } from "nanoid";
import { UploadFileDto } from "./file.types";
import { prisma } from "../../config";
import { StorageService } from "../storage";
import { ForbiddenException, NotFoundException } from "../../common/errors";
import { ensureAccessible } from "./file.lib";

export class FileService {
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
    const publicId = nanoid(14);
    const { storageKey } = await this.storage.uploadFile(file);
    if (!data.visibility) data.visibility = "PUBLIC";
    if (!data.expiresAt) data.expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    return this.prisma.file.create({
      data: {
        publicId,
        ownerId,
        originalName: data.name ?? file.originalname,
        storageKey,
        mimeType: file.mimetype,
        size: file.size,
        visibility: data.visibility,
        expiresAt: data.expiresAt,
        maxDownloads: data.maxDownloads,
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
  };

  findOne = async (publicId: string, ownerId: string) => {
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
    ensureAccessible(file, ownerId);
    return file;
  };

  previewFile = async (publicId: string, ownerId: string) => {
    const file = await this.prisma.file.findUnique({
      where: { publicId },
      select: {
        storageKey: true,
        mimeType: true,
        originalName: true,
        expiresAt: true,
        owner: {
          select: { id: true },
        },
      },
    });
    if (!file) throw new NotFoundException(`File not found.`);
    ensureAccessible(file, ownerId);
    const data = this.storage.getPreview(file.storageKey);
    return {
      data,
      mimeType: file.mimeType,
      name: file.originalName,
    };
  };

  downloadFile = async (publicId: string, ownerId: string) => {
    return this.prisma.$transaction(async (tx) => {
      const file = await tx.file.findUnique({
        where: { publicId },
        select: {
          id: true,
          storageKey: true,
          originalName: true,
          mimeType: true,
          maxDownloads: true,
          visibility: true,
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

      ensureAccessible(file, ownerId);

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

      const data = this.storage.getDownload(file.storageKey);
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
