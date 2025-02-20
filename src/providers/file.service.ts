import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  private basePath = path.resolve('files');
  private readonly logger = new Logger(FileService.name);

  async saveFile(
    buffer: Buffer,
    directory: string,
    originalName: string,
  ): Promise<string> {
    const fileExtension = path.extname(originalName);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.resolve(this.basePath, directory, fileName);
    try {
      // Создаем директорию, если её нет
      const dirPath = path.resolve(this.basePath, directory);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Сохраняем файл
      await fs.promises.writeFile(filePath, buffer);
      return `/files/${directory}/${fileName}`;
    } catch (error) {
      this.logger.error(
        `Ошибка при сохранении файла: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Ошибка при сохранении файла');
    }
  }

  /**
   * Удаляет файл, если он существует.
   * relativePath - Относительный путь к файлу (начинается с `/files/`).
   */
  async deleteFile(relativePath: string): Promise<void> {
    if (!relativePath) return;

    const absolutePath = path.resolve(
      this.basePath,
      relativePath.replace('/files/', ''),
    );

    try {
      if (fs.existsSync(absolutePath)) {
        await fs.promises.unlink(absolutePath);
      }
    } catch (error) {
      this.logger.error(
        `Ошибка при удалении файла: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Ошибка при удалении файла');
    }
  }
}
