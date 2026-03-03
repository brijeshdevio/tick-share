import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { JwtAuthGuard } from '../common/guards';
import { ZodValidationPipe } from '../common/pipes';
import { CurrentUser } from '../common/decorators';
import { ALLOWED_MIME_TYPES, MESSAGES } from '../constants';
import { apiResponse } from '../lib';
import { envConfig } from '../config';
import { fileValidation, getUrl } from './files.lib';
import { FilesService } from './files.service';
import { UploadFileSchema } from './schema';
import type { UploadFileDto } from './files.types';
import { OptionalJwtAuthGuard } from './guards';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  // ==============================
  // 1️⃣ Upload
  // ==============================
  @Post('upload')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(UploadFileSchema)) body: UploadFileDto,
    @CurrentUser('sub') ownerId: string,
  ) {
    await fileValidation(file);

    const uploaded = await this.filesService.uploadFile(
      ownerId,
      file,
      body,
    );

    return apiResponse(HttpStatus.CREATED, {
      message: MESSAGES.FILE_UPLOAD_SUCCESS,
      data: {
        ...uploaded,
        url: getUrl(uploaded.publicId),
      },
    });
  }

  // ==============================
  // 2️⃣ Cursor Pagination (Owner Files)
  // ==============================
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @CurrentUser('sub') userId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = Math.min(Number(limit) || 20, 100);

    const data = await this.filesService.getFiles(userId, cursor, parsedLimit);

    return apiResponse(200, { data });
  }

  // ==============================
  // 3️⃣ Public Metadata (Optional Auth)
  // ==============================
  @Get(':publicId/meta')
  @UseGuards(OptionalJwtAuthGuard)
  async findMetadata(
    @Param('publicId') publicId: string,
    @CurrentUser('sub') userId?: string,
  ) {
    const meta = await this.filesService.getMetadata(publicId, userId);
    return apiResponse(200, { data: meta });
  }

  // ==============================
  // 4️⃣ Preview (Optional Auth)
  // ==============================
  @Get(':publicId')
  @UseGuards(OptionalJwtAuthGuard)
  async preview(
    @Param('publicId') publicId: string,
    @CurrentUser('sub') userId: string | undefined,
    @Res() res: Response,
  ) {
    const { data, mimeType, name } = await this.filesService.preview(
      publicId,
      userId,
    );

    const buffer = Buffer.from(await data);

    const inlineTypes = [
      ...ALLOWED_MIME_TYPES.image,
      ...ALLOWED_MIME_TYPES.video,
      ...ALLOWED_MIME_TYPES.audio,
      'application/pdf',
    ];

    const disposition = inlineTypes.includes(mimeType)
      ? 'inline'
      : `attachment; filename="${name}"`;

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Disposition', disposition);
    res.setHeader('Access-Control-Allow-Origin', envConfig.FRONTEND_URL);
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    return res.status(200).end(buffer);
  }

  // ==============================
  // 5️⃣ Download (Increments Count)
  // ==============================

  @Get(':publicId/download')
  @UseGuards(OptionalJwtAuthGuard)
  async download(
    @Param('publicId') publicId: string,
    @CurrentUser('sub') userId: string | undefined,
    @Res() res: Response,
  ) {
    const { data, mimeType, name } = await this.filesService.download(
      publicId,
      userId,
    );

    const buffer = Buffer.from(await data);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('X-Content-Type-Options', 'nosniff');

    return res.status(200).end(buffer);
  }

  // ==============================
  // 6️⃣ Soft Delete
  // ==============================
  @Delete(':publicId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(
    @Param('publicId') publicId: string,
    @CurrentUser('sub') userId: string,
  ) {
    await this.filesService.softDelete(publicId, userId);
  }
}
