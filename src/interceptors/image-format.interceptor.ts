import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as sharp from 'sharp';

@Injectable()
export class ImageFormatInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const file = req.file;

    if (!file) {
      return next.handle();
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Неверный формат файла. Разрешены только: JPEG, PNG, WebP',
      );
    }

    try {
      // Настройки изменения размера
      const maxWidth = 300;
      const maxHeight = 300;

      file.buffer = await sharp(file.buffer)
        .resize({
          width: maxWidth,
          height: maxHeight,
          fit: 'outside', // Сохраняем пропорции
        })
        .toFormat('webp', { quality: 90 })
        .toBuffer();

      return next.handle().pipe(map((data) => data));
    } catch (error) {
      throw new BadRequestException('Ошибка при обработке изображения');
    }
  }
}
