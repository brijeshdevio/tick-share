import { Request, Response } from "express";
import { FileService } from "./file.service";
import { fileValidation, getUrl } from "./file.lib";
import { BadRequestException } from "../../common/errors";
import { apiResponse } from "../../lib/http";
import { ALLOWED_MIME_TYPES, MESSAGES } from "../../constants";
import { env } from "../../config";

export class FileController {
  constructor(private readonly fileService: FileService) {}

  upload = async (req: Request, res: Response) => {
    if (!req.file) {
      throw new BadRequestException(`File is required.`);
    }

    fileValidation(req?.file);
    const uploadedFile = await this.fileService.uploadFile(
      req?.user?.sub,
      req.body,
      req.file,
    );
    return apiResponse(res, {
      statusCode: 201,
      data: {
        ...uploadedFile,
        url: getUrl(uploadedFile.publicId),
      },
      message: MESSAGES.FILE_UPLOAD_SUCCESS,
    });
  };

  findMany = async (req: Request, res: Response) => {
    const data = await this.fileService.findMany(req.user.sub);
    return apiResponse(res, { data });
  };

  findOne = async (req: Request, res: Response) => {
    const publicId = req.params.publicId as string;
    const data = await this.fileService.findOne(publicId, req?.user?.sub);
    return apiResponse(res, { data });
  };

  previewFile = async (req: Request, res: Response) => {
    const publicId = req.params.publicId as string;
    const { data, mimeType, name } = await this.fileService.previewFile(
      publicId,
      req?.user?.sub,
    );

    const buffer = Buffer.from(await data);

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

    return res.status(200).end(buffer);
  };

  downloadFile = async (req: Request, res: Response) => {
    const publicId = req.params.publicId as string;
    const { data, mimeType, name } = await this.fileService.downloadFile(
      publicId,
      req?.user?.sub,
    );

    const buffer = Buffer.from(await data);

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("X-Content-Type-Options", "nosniff");

    return res.status(200).end(buffer);
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const data = await this.fileService.deleteFile(id, req?.user?.sub);
    return apiResponse(res, {
      statusCode: 200,
      data,
      message: MESSAGES.FILE_DELETE_SUCCESS,
    });
  };
}
