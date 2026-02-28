import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../common/guards';
import { ZodValidationPipe } from '../common/pipes';
import { CurrentUser } from '../common/decorators';
import { MESSAGES } from '../constants';
import { apiResponse } from '../lib';
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
}
