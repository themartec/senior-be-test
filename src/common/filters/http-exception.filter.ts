import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { isArray } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exResponse: any = exception.getResponse();
    let message = exception.message;
    if (isArray(exResponse.message) && exResponse.message.length) {
      message = exResponse.message[0];
    }

    const responseBody: any = {
      status: {
        success: false,
        code: status,
        message,
      },
    };

    response.status(HttpStatus.OK).json(responseBody);
  }
}
