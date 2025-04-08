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

  private readonly bucketName = 'images';

  private readonly s3 = new S3Client({
    region: 'auto', // обязательно для Cloudflare
    endpoint: this.configService.get<string>('R2_ENDPOINT'),
    credentials: {
      accessKeyId: this.configService.get<string>('R2_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('R2_SECRET_ACCESS_KEY'),
    },
  });

  async saveFileToR2(key: string, buffer: Buffer): Promise<void> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: this.getContentType(key),
      });

      await this.s3.send(command);
    } catch (error) {
      this.logger.error('Ошибка при загрузке файла в R2', error);
      throw new InternalServerErrorException('Ошибка при сохранении файла');
    }
  }

  async deleteFileFromR2(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3.send(command);
    } catch (error) {
      this.logger.error('Ошибка при удалении файла из R2', error);
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
