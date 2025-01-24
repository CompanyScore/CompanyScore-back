import { Controller, Get, Response, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('github'))
  @Get('github')
  github() {
    return 'Redirecting to GitHub...';
  }

  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  async githubCallback(@Request() req, @Response() res) {
    // Устанавливаем Access Token в обычные куки
    res.cookie('accessToken', req.accessToken, {
      httpOnly: true, // Защита от XSS
      maxAge: 15 * 60 * 1000, // 15 минут
    });

    // Устанавливаем Refresh Token в HttpOnly куки
    res.cookie('refreshToken', req.refreshToken, {
      httpOnly: true, // Доступен только серверу
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    return res.redirect('/');
    // return req.user;
  }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('jwt');
    return res.json({ message: 'Logged out successfully' });
  }
}
