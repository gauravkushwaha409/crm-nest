import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseService } from './response.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const name =
      exception instanceof HttpException ? exception.name : 'Exception';

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Some error occured';

    response
      .status(status)
      .json(ResponseService.error(message, status, null, name));
  }
}
