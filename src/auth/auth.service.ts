import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return { accessToken: token, user };
  }

  decodeToken(token: string) {
    return jwt.decode(token); // Декодирует payload (но НЕ проверяет подпись)
  }
}
