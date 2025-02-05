import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(profile: any) {
    let user = await this.usersService.findOne(null, profile.sub);

    if (!user) {
      user = await this.usersService.create({ linkedinId: profile.sub });
    }

    const userWithTokens = await this.login(user);

    return userWithTokens;
  }

  async login(user: User) {
    console.log('User before token generation:', user);
    const payload = { sub: user.id, role: user.role };

    // Генерируем accessToken и refreshToken
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN / 1000,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: +process.env.JWT_REFRESH_EXPIRES_IN / 1000,
    });

    // Сохраняем refreshToken в базе данных (опционально)
    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async refreshAccessToken(refreshToken: string, res: ExpressResponse) {
    try {
      const decoded: any = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );

      const user = await this.usersService.findOne(decoded.sub, null);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Генерируем новый accessToken
      const newAccessToken = jwt.sign(
        { sub: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: +process.env.JWT_EXPIRES_IN / 1000,
        },
      );

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true, // Запрещает доступ через JS
        sameSite: 'lax', // Защита от CSRF
        maxAge: 60000, // 1 мин
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  decodeToken(token: string) {
    return jwt.decode(token); // Декодирует payload (но НЕ проверяет подпись)
  }
}
