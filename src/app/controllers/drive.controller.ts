import { Controller, Get, Param, Post, Render, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Drive } from '../interfaces/drive.interface';
import { AppService } from '../services/app.service';
import { Request, Response } from 'express';
import { FileInterceptor, } from '@nestjs/platform-express';

@Controller('drives')
export class DriveController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/drives')
  root() {
    return {drives: this.appService.getDrives()};
  }

  @Get('google-drive')
  @Render('pages/driveList')
  getGoogleDrive(@Req() request: Request, @Res({ passthrough: true }) response: Response): any {
    return this.appService.listDrive(request, response).then(function(result) {
      return {files: result};
    }).catch(console.error);
  }

  @Post('google-drive')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Req() request: Request, @Res({ passthrough: true }) response: Response, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.appService.uploadFile(request, response, file);
  }

  @Get('google-drive/:id')
  getGoogleDriveFile(@Req() request: Request, @Res({ passthrough: true }) response: Response, @Param() params): any {
    return this.appService.downloadFile(request, response, params.id);
  }
}
