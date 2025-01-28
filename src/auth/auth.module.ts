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

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', global: true }),
    JwtModule.register({
      secret: 'default_secret',
      signOptions: { expiresIn: '15m' }, // Рекомендуется 15 минут
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GithubStrategy,
    JwtStrategy,
    LinkedInStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
