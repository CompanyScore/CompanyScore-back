import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: configService.get<number>('JWT_ACCESS_EXPIRES_IN'),
  },
  global: true,
});
