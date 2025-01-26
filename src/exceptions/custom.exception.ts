import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    errorCode: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ message, errorCode }, status);
  }
}
