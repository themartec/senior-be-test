import { Injectable, Logger } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import { WatermartImageDto, WatermartTextDto } from './dto/media.dto';
const fontPath = './arial.ttf';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  private __genFileName() {
    return uuidv4() + '.mp4';
  }
  private __getPathFile(fileName: string) {
    return path.resolve(__dirname, '../../media', fileName);
  }
  private __removeFileError(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        this.logger.error('Không thể xóa tệp tin:', err);
        return;
      }
    });
  }

  downloadFile(url: string) {
    return new Promise((resolve, reject) => {
      const fileName = this.__genFileName();
      const filePath = this.__getPathFile(fileName);

      const fileStream = fs.createWriteStream(filePath);
      https.get(url, (response) => {
        response.pipe(fileStream);
        fileStream
          .on('finish', () => {
            fileStream.close(() => {
              return resolve(fileName);
            });
          })
          .on('error', (error) => {
            this.logger.error('Đã xảy ra lỗi:', error);
            this.__removeFileError(filePath);
            return reject(error);
          });
      });
    });
  }

  watermartText(body: WatermartTextDto) {
    return new Promise((resolve, reject) => {
      const filePathInput = this.__getPathFile(body.file);
      const fileNameOutput = this.__genFileName();
      const filePathOutput = this.__getPathFile(fileNameOutput);

      const filterOptions = body.options.map((option) => ({
        filter: 'drawtext',
        options: {
          ...option,
          fontfile: fontPath,
        },
      }));

      ffmpeg(filePathInput)
        .videoFilters(filterOptions)
        .output(filePathOutput)
        .on('end', () => {
          resolve(fileNameOutput);
        })
        .on('error', (err) => {
          this.logger.error('Đã xảy ra lỗi:', err);
          this.__removeFileError(filePathOutput);
          reject(`Đã xảy ra lỗi: ${err.message}`);
        })
        .run();
    });
  }

  watermartImage(body: WatermartImageDto, files: Express.Multer.File[]) {
    return new Promise((resolve, reject) => {
      const filePathInput = this.__getPathFile(body.file);
      const fileNameOutput = this.__genFileName();
      const filePathOutput = this.__getPathFile(fileNameOutput);
      const options = JSON.parse(body.options);
      const filterOptions = options.map((option, idx: number) => ({
        filter: 'overlay',
        options: option,
        inputs: `[${idx ? 'tmp' : 0}][${idx + 1}:v]`,
        outputs: 'tmp',
      }));

      const ffmpegConfig = ffmpeg(filePathInput);
      files.map((file) => {
        ffmpegConfig.input(this.__getPathFile(file.filename));
      });

      ffmpegConfig
        .complexFilter(filterOptions, 'tmp')
        .outputOptions('-map', '0:a')
        .output(filePathOutput)
        .on('end', () => {
          resolve(fileNameOutput);
        })
        .on('error', (err) => {
          this.logger.error('Đã xảy ra lỗi:', err);
          this.__removeFileError(filePathOutput);
          reject(`Đã xảy ra lỗi: ${err.message}`);
        })
        .run();
    });
  }

  mergeVideo(files: string[]) {
    return new Promise((resolve, reject) => {
      const fileNameOutput = this.__genFileName();
      const filePathOutput = this.__getPathFile(fileNameOutput);

      const ffmpegConfig = ffmpeg();
      files.map((file) => {
        ffmpegConfig.input(this.__getPathFile(file));
      });

      const configFilter = [];
      let config = '';
      files.map((_, idx) => {
        configFilter.push(`[${idx}:v]scale=1280:720,setsar=1[v${idx}]`);
        config += `[v${idx}][${idx}:a]`;
      });
      const configAfter = `${config}concat=n=${files.length}:v=1:a=1[outv][outa]`;
      ffmpegConfig
        .complexFilter([...configFilter, configAfter])
        .outputOptions('-map', '[outv]', '-map', '[outa]');

      ffmpegConfig
        .on('end', () => {
          resolve(fileNameOutput);
        })
        .on('error', (err) => {
          this.logger.error(`Đã xảy ra lỗi: ${err.message}`);
          reject(err);
        })
        .output(filePathOutput)
        .run();
    });
  }
}
