import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((result) => {
        const response = _context.switchToHttp().getResponse();
        response.status(200); // always response status code 200 for all request

        const { data, status, code, message } = result;
        const responseBody: any = {};

        if (status) {
          responseBody.status = status;
        } else {
          responseBody.status = {
            success: true,
            code: code || 200,
            message: message || 'Success',
          };
        }

        if (data) responseBody.data = data;

        return responseBody;
      }),
    );
  }
}
