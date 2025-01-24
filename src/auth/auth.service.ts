import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(profile: any) {
    // Ищем пользователя по githubId
    let user = await this.usersService.findOne(null, profile.id);

    // Если пользователь не найден, создаем нового
    if (!user) {
      user = await this.usersService.create({ githubId: profile.id });
    }

    // const accessToken = this.jwtService.sign(
    //   { id: user.id, githubId: profile.id },
    //   { expiresIn: '15m' }, // Access Token действует 15 минут
    // );

    // const refreshToken = this.jwtService.sign(
    //   { id: user.id, githubId: profile.id },
    //   { expiresIn: '7d' }, // Refresh Token действует 7 дней
    // );

    return user;
  }
}
