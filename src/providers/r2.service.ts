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
export class R2Service {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(R2Service.name);

  private readonly bucketName =
    this.configService.get<string>('R2_BUCKET_NAME');

  private readonly s3 = new S3Client({
    region: this.configService.get<string>('R2_REGION'), // например, "auto" или "us-east-1"
    endpoint: this.configService.get<string>('R2_ENDPOINT'),
    credentials: {
      accessKeyId: this.configService.get<string>('R2_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('R2_SECRET_KEY'),
    },
    forcePathStyle: true, // ВАЖНО для Cloudflare R2
  });

  async saveFile(key: string, buffer: Buffer): Promise<void> {
    try {
      this.logger.log(`Сохраняем файл: ${key} в бакет ${this.bucketName}`);
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: this.getContentType(key),
        ACL: 'public-read', // НЕ ОБЯЗАТЕЛЬНО, можно удалить если используешь signed URL
      });

      const result = await this.s3.send(command);
      this.logger.log(`Файл сохранён: ${JSON.stringify(result)}`);
    } catch (error: any) {
      this.logger.error('❌ Ошибка при загрузке файла в Cloudflare R2');
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
      this.logger.error('Ошибка при удалении файла из Cloudflare R2', error);
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
