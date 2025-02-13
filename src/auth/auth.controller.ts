import {
  Controller,
  Get,
  Response,
  Request,
  UseGuards,
  Post,
  Body,
  UnauthorizedException,
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
    if (!req.user) {
      return res.status(400).json({ message: 'User not found in request' });
    }

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
      return res.status(401).json({ message: 'Не авторизован' });
    }

    return res.json(cookies);
  }

  @Public()
  @Post('refresh')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Response() res,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const result = await this.authService.refreshAccessToken(refreshToken, res);
    return res.json(result); // Отправляем JSON-ответ
  }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken'); // удали из БД
    res.clearCookie('userId');
    return res.json({ message: 'Logged out successfully' });
  }
}
