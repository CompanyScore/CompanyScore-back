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
    console.log('Generated token:', token);
    return { accessToken: token, user };
  }
}
