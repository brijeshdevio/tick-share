import { Request, Response } from "express";
import { FilesService } from "./files.services";
import { apiResponse } from "../../lib";
import { ALLOWED_MIME_TYPES } from "../../constants";
import { env } from "../../config";

export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  private setHeader = (
    res: Response,
    buffer: Buffer,
    mimeType: string,
    name: string,
  ) => {
    const inlineTypes = [
      ...ALLOWED_MIME_TYPES.image,
      ...ALLOWED_MIME_TYPES.video,
      ...ALLOWED_MIME_TYPES.audio,
      "application/pdf",
    ];

    const disposition = inlineTypes.includes(mimeType)
      ? "inline"
      : `attachment; filename="${name}"`;

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Disposition", disposition);
    res.setHeader("Access-Control-Allow-Origin", env.FRONTEND_URL);
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  };

  uploadFile = async (req: Request, res: Response) => {
    const data = await this.filesService.uploadFile(
      req.user.sub,
      req.body,
      req.file!,
    );
    return apiResponse(res, { data });
  };

  findMany = async (req: Request, res: Response) => {
    const data = await this.filesService.findMany(req.user.sub);
    return apiResponse(res, { data });
  };

  findOne = async (req: Request, res: Response) => {
    const shareToken = req.params.shareToken as string;
    const data = await this.filesService.findOne(shareToken);
    return apiResponse(res, { data });
  };

  previewFile = async (req: Request, res: Response) => {
    const shareToken = req.params.shareToken as string;
    const { data, mimeType, name } =
      await this.filesService.previewFile(shareToken);
    const buffer = Buffer.from(await data);
    this.setHeader(res, buffer, mimeType, name);
    return res.status(200).end(buffer);
  };

  downloadFile = async (req: Request, res: Response) => {
    const shareToken = req.params.shareToken as string;
    const { data, mimeType, name } =
      await this.filesService.downloadFile(shareToken);

    const buffer = Buffer.from(await data);

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("X-Content-Type-Options", "nosniff");

    return res.status(200).end(buffer);
  };

  deleteFile = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const data = await this.filesService.deleteFile(id, req.user?.sub);
    return apiResponse(res, { data });
  };
}
