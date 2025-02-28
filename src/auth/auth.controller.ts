import {
  Controller,
  Get,
  Response,
  Request,
  UseGuards,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/decorators/public.decorator';
import * as ms from 'ms';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('login')
  login(@Request() req, @Response() res) {
    const token = this.authService.login(req.user);

    return res.json(token);
  }

  @Public()
  @UseGuards(AuthGuard('linkedin'))
  @Get('linkedin')
  async linkedin() {
    return 'ok';
  }

  @Public()
  @UseGuards(AuthGuard('linkedin'))
  @Get('linkedin/callback')
  async linkedinCallback(@Request() req, @Response() res) {
    const userData = await this.authService.validateUser(req.user);

    res.cookie('accessToken', userData.accessToken, {
      httpOnly: true, // Запрещает доступ через JS
      secure: process.env.NODE_ENV === 'production', // Только HTTPS в проде
      sameSite: 'lax', // Защита от CSRF
      maxAge: ms('15m'), //+this.configService.get<number>('jwt.accessExpiresIn'), // 15 мин
    });

    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true, // Запрещает доступ через JS
      secure: process.env.NODE_ENV === 'production', // Только HTTPS в проде
      sameSite: 'lax', // Защита от CSRF
      maxAge: ms('7d'),
    });

    res.cookie('userId', userData.user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ms('7d'),
    });

    return res.redirect(`http://localhost:3000/profile`);
  }

  @Public()
  @Get('cookies')
  getProfile(@Request() req, @Response() res) {
    const cookies = req.cookies;

    if (!cookies) {
      throw new BadRequestException(`Не авторизован!`);
    }

    return res.json(cookies);
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Request() req, @Response() res) {
    // Извлекаем refreshToken из cookies
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token отсутствует');
    }
    const result = await this.authService.refreshAccessToken(refreshToken, res);
    return res.json(result);
  }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('userId');
    return res.json({ message: 'До скорого свидания!' });
  }
}
