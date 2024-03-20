import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from '../media.controller';
import { MediaService } from '../media.service';
import * as fs from 'fs';
import { UPLOAD_TYPE } from '../const';
import { join } from 'path';
import { createReadStream } from 'fs';
import { BadRequestException } from '@nestjs/common';

const fileToBuffer = (filename) => {
  const readStream = fs.createReadStream(filename);
  const chunks = [];
  return new Promise((resolve, reject) => {
    // Handle any errors while reading
    readStream.on('error', (err) => {
      // handle error

      // File could not be read
      reject(err);
    });

    // Listen for data
    readStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    // File is done being read
    readStream.on('close', () => {
      // Create a buffer of the image from the stream
      resolve(Buffer.concat(chunks));
    });
  });
};

describe('MediaController', () => {
  let controller: MediaController;

  beforeEach(async () => {
    jest.setTimeout(60000);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaService],
    }).compile();

    controller = module.get<MediaController>(MediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload file success with type file', async () => {
      const path = 'media/5ea61f4a-bdeb-4592-a8c3-5f55d91b0054.mp4';
      const pathFileUpload = join(process.cwd(), path);
      const fileUploaded = createReadStream(pathFileUpload);
      const fileBuffer = (await fileToBuffer(pathFileUpload)) as Buffer;
      const file = {
        fieldname: 'file',
        originalname: 'input.mp4',
        encoding: '7bit',
        mimetype: 'video/mp4',
        destination: './media',
        filename: '5ea61f4a-bdeb-4592-a8c3-5f55d91b0054.mp4',
        path: 'media/5ea61f4a-bdeb-4592-a8c3-5f55d91b0054.mp4',
        size: 4357444,
        stream: fileUploaded,
        buffer: fileBuffer,
      };
      const { data } = await controller.uploadFile(file, UPLOAD_TYPE.FILE, {});
      expect(data).toEqual('5ea61f4a-bdeb-4592-a8c3-5f55d91b0054.mp4');
    });

    it('should upload file success with type link', async () => {
      const { data } = await controller.uploadFile(null, UPLOAD_TYPE.LINK, {
        url: 'https://download.samplelib.com/mp4/sample-5s.mp4',
      });
      expect(typeof data).toEqual('string');
    });

    it('should upload file fail with type not support', async () => {
      const result = controller.uploadFile(null, 'test', {
        url: 'https://download.samplelib.com/mp4/sample-5s.mp4',
      });
      await expect(result).rejects.toThrowError(BadRequestException);
    });
  });

  describe('watermartText', () => {
    it('should watermart text success', async () => {
      const body = {
        file: '5ea61f4a-bdeb-4592-a8c3-5f55d91b0054.mp4',
        options: [
          {
            fontsize: 24,
            text: 'test 1',
            x: '100',
            y: '200',
            fontcolor: 'white',
            shadowcolor: 'black',
            shadowx: 2,
            shadowy: 2,
            enable: 'between(t,1,4)',
          },
          {
            fontsize: 34,
            text: 'test 2',
            x: '(w-text_w)/3',
            y: '(h-text_h)/3',
            fontcolor: 'red',
            shadowcolor: 'blue',
            shadowx: 3,
            shadowy: 3,
            enable: 'between(t,2,6)',
          },
        ],
      };
      const { data } = await controller.watermartText(body);
      expect(typeof data).toEqual('string');
    });
  });

  describe('watermartImage', () => {
    it('should watermart image success', async () => {
      const path = 'media/7d80fedd-75c3-4799-b9ef-1b7514980699.png';
      const pathFileUpload = join(process.cwd(), path);
      const fileUploaded = createReadStream(pathFileUpload);
      const fileBuffer = (await fileToBuffer(pathFileUpload)) as Buffer;
      const files = [
        {
          fieldname: 'images',
          originalname: 'Point.png',
          encoding: '7bit',
          mimetype: 'image/png',
          destination: './media',
          filename: '7d80fedd-75c3-4799-b9ef-1b7514980699.png',
          path: 'media/7d80fedd-75c3-4799-b9ef-1b7514980699.png',
          size: 29948,
          stream: fileUploaded,
          buffer: fileBuffer,
        },
        {
          fieldname: 'images',
          originalname: 'smile.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: './media',
          filename: 'd67cf3a8-c399-4ed8-ae8f-f570e9b746eb.jpg',
          path: 'media/d67cf3a8-c399-4ed8-ae8f-f570e9b746eb.jpg',
          size: 45660,
          stream: fileUploaded,
          buffer: fileBuffer,
        },
      ];
      const body = {
        file: '5ea61f4a-bdeb-4592-a8c3-5f55d91b0054.mp4',
        options:
          '[{"enable":"between(t,2,4)","x":"1","y":"2"},{"enable":"between(t,3,5)","x":"100","y":"200"}]',
      };
      const { data } = await controller.watermartImage(files, body);
      expect(typeof data).toEqual('string');
    });
  });

  describe('mergeVideo', () => {
    jest.setTimeout(60000);
    it('should merge video success', async () => {
      const body = {
        files: [
          '5ea61f4a-bdeb-4592-a8c3-5f55d91b0054.mp4',
          'cb9f9333-04ee-468f-820b-cead2fba3318.mp4',
        ],
      };
      const { data } = await controller.mergeVideo(body);
      expect(typeof data).toEqual('string');
    });
  });
});
