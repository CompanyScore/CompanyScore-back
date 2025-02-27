import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(`HTTP Exception: ${exception.message}`, exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorCode = exceptionResponse['errorCode']
      ? exceptionResponse['errorCode']
      : 'UNKNOWN_ERROR';

    const message = exceptionResponse['message']
      ? exceptionResponse['message']
      : exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      errorCode,
    });
  }
}
