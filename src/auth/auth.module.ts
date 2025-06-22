import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './passport/jwt.strategy';
import { LinkedInStrategy } from './passport/linkedin.strategy';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { SpacesService } from 'src/providers/space.service';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', global: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LinkedInStrategy,
    LocalStrategy,
    JwtAuthGuard,
    UsersService,
    SpacesService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
