import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(UploadFileSchema)) body: UploadFileDto,
    @CurrentUser('sub') userId: string,
  ) {
    fileValidation(file);
    const uplaodedFile = await this.filesService.upload(userId, body, file);
    const url = getUrl(uplaodedFile.id);
    return apiResponse(201, {
      data: {
        url,
        ...uplaodedFile,
      },
      message: MESSAGES.FILE_UPLOAD_SUCCESS,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser('sub') userId: string) {
    const data = await this.filesService.findAll(userId);
    return apiResponse(200, { data });
  }

  @Get(':id')
  async preview(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const { data, mimeType, name } = await this.filesService.previewPublic(id);
    const buffer = Buffer.from(data);
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
    res.setHeader('Access-Control-Allow-Origin', envConfig.FRONTEND_URL);
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Content-Disposition', disposition);
    res.end(buffer);
  }
}
