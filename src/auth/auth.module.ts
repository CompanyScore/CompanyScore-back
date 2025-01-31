import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { GithubStrategy } from './passport/github.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './passport/jwt.strategy';
import { LinkedInStrategy } from './passport/linkedin.strategy';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', global: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
        signOptions: {
          expiresIn: configService.get<number>('jwt.accessExpiresIn'),
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GithubStrategy,
    JwtStrategy,
    LinkedInStrategy,
    JwtAuthGuard,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
