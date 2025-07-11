import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { R2Service } from 'src/providers/r2.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly r2Service: R2Service,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or passowrd');
    }

    const userWithTokens = await this.login(user);
    return userWithTokens;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const existsingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (existsingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const userWithTokens = await this.login(newUser);
    return userWithTokens;
  }

  async validateUserByLinkedin(profile: any) {
    let user = await this.usersService.findOneByLinkedin(profile.sub);

    if (!user) {
      const createUserData: CreateUserDto = {
        linkedinId: profile.sub,
        name: profile.name,
        email: profile.email,
      };

      if (profile.picture) {
        const { data } = await axios.get(profile.picture, {
          responseType: 'arraybuffer',
        });

        const avatarArrayBuffer: ArrayBuffer = data;
        const avatarBuffer: Buffer = Buffer.from(avatarArrayBuffer);
        const avatarKey = `users/avatars/${uuidv4()}.jpg`;
        await this.r2Service.saveFile(avatarKey, avatarBuffer);
        createUserData.avatar = avatarKey;
      }

      user = await this.usersService.create(createUserData);
    }

    const userWithTokens = await this.login(user);

    return userWithTokens;
  }

  async login(user: User) {
    if (!user) {
      throw new BadRequestException(`Пользователь не найден!`);
    }

    const payload = { sub: user.id, role: user.role };

    // Генерируем accessToken и refreshToken
    const accessToken = jwt.sign(
      payload,
      this.configService.get<string>('JWT_ACCESS_SECRET'),
      {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      },
    );

    const refreshToken = jwt.sign(
      payload,
      this.configService.get<string>('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      },
    );

    // Сохраняем refreshToken в базе данных (опционально)
    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async refreshAccessToken(refreshToken: string, res: Response) {
    try {
      const decoded: any = jwt.verify(
        refreshToken,
        this.configService.get<string>('JWT_REFRESH_SECRET'),
      );

      const user = await this.usersService.findOne(decoded.sub);

      if (user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Генерируем новый accessToken
      const newAccessToken = jwt.sign(
        { sub: user.id, role: user.role },
        this.configService.get<string>('JWT_ACCESS_SECRET'),
        {
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
        },
      );

      const isProd = process.env.NODE_ENV === 'production';

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true, // Запрещает доступ через JS
        secure: isProd, // Только HTTPS в проде
        sameSite: isProd ? 'none' : 'lax',
        maxAge: ms('15m'),
        path: '/',
        ...(isProd && { domain: '.companyscore.net' }),
      });

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException(
        'Недействительный или просроченный токен обновления!',
      );
    }
  }

  decodeToken(token: string) {
    return jwt.decode(token); // Декодирует payload (но НЕ проверяет подпись)
  }
}
