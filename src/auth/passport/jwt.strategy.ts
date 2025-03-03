import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.accessToken || null,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      passReqToCallback: true, // Передаем request в validate
    });
  }

  async validate(request: Request & { res?: Response }, payload: any) {
    if (!payload && request.cookies.refreshToken) {
      const newAccessToken = await this.authService.refreshAccessToken(
        request.cookies.refreshToken,
        request.res,
      );
      return this.authService.decodeToken(newAccessToken.accessToken);
    }

    return payload;
  }
}
