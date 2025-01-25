import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    console.log('User for token:', user); // Убедись, что user не пустой
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('Generated token:', token);
    return { accessToken: token };
  }

  async validateUser(profile: any) {
    let user = await this.usersService.findOne(null, profile.id);

    if (!user) {
      user = await this.usersService.create({ githubId: profile.id });
    }

    return user;
  }
}
