import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpacesService {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(SpacesService.name);

  private readonly bucketName = this.configService.get<string>(
    'DO_SPACE_BUCKET_NAME',
  );

  private readonly s3 = new S3Client({
    region: 'ams3', // замените на свой регион
    endpoint: this.configService.get<string>('DO_SPACE_ENDPOINT'), // например: https://ams3.digitaloceanspaces.com
    credentials: {
      accessKeyId: this.configService.get<string>('DO_SPACE_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('DO_SPACE_SECRET_KEY'),
    },
  });

  async saveFile(key: string, buffer: Buffer): Promise<void> {
    try {
      this.logger.log(`Сохраняем файл: ${key} в бакет ${this.bucketName}`);
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: this.getContentType(key),
      });

      const result = await this.s3.send(command);
      this.logger.log(`Файл сохранён: ${JSON.stringify(result)}`);
    } catch (error: any) {
      this.logger.error('❌ Ошибка при загрузке файла в DigitalOcean Spaces');
      this.logger.error(error.name, error.message, error.stack);
      throw new InternalServerErrorException('Ошибка при сохранении файла');
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3.send(command);
    } catch (error) {
      this.logger.error(
        'Ошибка при удалении файла из DigitalOcean Spaces',
        error,
      );
      this.logger.error(error.name, error.message, error.stack);
      throw new InternalServerErrorException('Ошибка при удалении файла');
    }
  }

  private getContentType(key: string): string {
    const ext = key.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'webp':
        return 'image/webp';
      case 'gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  }
}
