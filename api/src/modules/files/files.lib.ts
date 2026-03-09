import { ForbiddenException } from "../../common";

export const ensureAccessible = (file: any) => {
  if (!file) {
    throw new ForbiddenException(
      "File record not found. The requested file may have been deleted.",
    );
  }

  if (file.expiresAt && new Date(file.expiresAt) < new Date()) {
    throw new ForbiddenException(
      "This file has expired and is no longer available for download.",
    );
  }

  if (
    file.maxDownloads &&
    typeof file.downloadCount === "number" &&
    file.downloadCount >= file.maxDownloads
  ) {
    throw new ForbiddenException(
      `Download limit reached. This file can only be downloaded ${file.maxDownloads} times.`,
    );
  }
};
