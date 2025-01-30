// src/auth/passport/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req.headers); // Логируем заголовки
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      secretOrKey: 'default_secret', // Используем секрет из .env
    });
  }

  async validate(payload: any) {
    console.log('123', payload);

    return payload; // Просто возвращаем payload, который передан в токен
  }
}
