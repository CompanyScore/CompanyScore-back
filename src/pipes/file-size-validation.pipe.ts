import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  private readonly maxSize = 2 * 1024 * 1024; // 2MB
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  transform(value: Express.Multer.File) {
    if (!value) {
      throw new BadRequestException('Файл не загружен');
    }

    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `Файл слишком большой. Максимальный размер: ${this.maxSize / (1024 * 1024)}MB`,
      );
    }

    if (!this.allowedMimeTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `Неверный формат файла. Разрешены только: ${this.allowedMimeTypes.map((type) => type.split('/')[1]).join(', ')}`,
      );
    }

    return value;
  }
}
