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
      throw new BadRequestException('Файл не загружен');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Неверный формат файла. Разрешены только: JPEG, PNG, WebP',
      );
    }

    try {
      // Конвертируем изображение в WebP
      const webpBuffer = await sharp(file.buffer)
        .toFormat('webp', { quality: 80 }) // Сжатие 80% (можно изменить)
        .toBuffer();

      // Обновляем файл в запросе
      file.buffer = webpBuffer;
      file.mimetype = 'image/webp';
      file.originalname = file.originalname.replace(
        /\.(jpg|jpeg|png)$/,
        '.webp',
      );

      return next.handle().pipe(map((data) => data));
    } catch (error) {
      throw new BadRequestException('Ошибка при обработке изображения');
    }
  }
}
