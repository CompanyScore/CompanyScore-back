import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  private basePath = path.resolve('files');

  /**
   * Сохраняет файл в указанной директории.
   * @param buffer - Буфер данных файла.
   * @param directory - Поддиректория внутри `files`.
   * @param originalName - Оригинальное имя файла (для получения расширения).
   * @returns Путь к сохраненному файлу.
   */
  async saveFile(
    buffer: Buffer,
    directory: string,
    originalName: string,
  ): Promise<string> {
    const fileExtension = path.extname(originalName);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.resolve(this.basePath, directory, fileName);

    // Создаем директорию, если её нет
    const dirPath = path.resolve(this.basePath, directory);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Сохраняем файл
    await fs.promises.writeFile(filePath, buffer);
    return `/files/${directory}/${fileName}`;
  }

  /**
   * Удаляет файл, если он существует.
   * @param relativePath - Относительный путь к файлу (начинается с `/files/`).
   */
  async deleteFile(relativePath: string): Promise<void> {
    if (!relativePath) return;

    const absolutePath = path.resolve(
      this.basePath,
      relativePath.replace('/files/', ''),
    );

    if (fs.existsSync(absolutePath)) {
      await fs.promises.unlink(absolutePath);
    }
  }
}
