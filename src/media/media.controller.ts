import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Param,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { UPLOAD_TYPE } from './const';
import {
  MergeVideoDto,
  WatermartImageDto,
  WatermartTextDto,
} from './dto/media.dto';
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post('upload/:type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('type') type: string,
    @Body() body: { url?: string },
  ) {
    try {
      switch (type) {
        case UPLOAD_TYPE.FILE: {
          if (!file) {
            throw new BadRequestException(`file is not empty`);
          }
          return { data: file.filename };
        }
        case UPLOAD_TYPE.LINK: {
          if (!body.url) {
            throw new BadRequestException(`url is not empty`);
          }
          const data = await this.mediaService.downloadFile(body.url);
          return { data };
        }
        default:
          throw new BadRequestException(`Not support upload type ${type}`);
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('watermart-text')
  async watermartText(@Body() body: WatermartTextDto) {
    try {
      const data = await this.mediaService.watermartText(body);
      return { data };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('watermart-image')
  @UseInterceptors(FilesInterceptor('images'))
  async watermartImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: WatermartImageDto,
  ) {
    try {
      const data = await this.mediaService.watermartImage(body, files);
      return { data };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('merge-video')
  async mergeVideo(@Body() body: MergeVideoDto) {
    try {
      const data = await this.mediaService.mergeVideo(body.files);
      return { data };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
