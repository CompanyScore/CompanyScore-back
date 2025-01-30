import {
  Controller,
  Get,
  Response,
  Request,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Request() req, @Response() res) {
    if (!req.user) {
      return res.status(400).json({ message: 'User not found in request' });
    }

    const token = this.authService.login(req.user);

    return res.json(token);
  }

  @UseGuards(AuthGuard('linkedin'))
  @Get('linkedin')
  async linkedin() {
    return 'ok';
  }

  @UseGuards(AuthGuard('linkedin'))
  @Get('linkedin/callback')
  async linkedinCallback(@Request() req, @Response() res) {
    const userData = await this.authService.validateUser(req.user);

    res.cookie('accessToken', userData.accessToken, {
      httpOnly: true, // Запрещает доступ через JS
      // secure: process.env.NODE_ENV === 'production', // Только HTTPS в проде
      sameSite: 'lax', // Защита от CSRF
      maxAge: 15 * 60 * 1000, // 15 мин
    });

    res.cookie('userId', userData.user.id, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 день
    });

    return res.redirect(`http://localhost:3000`);
  }

  @Get('cookies')
  getProfile(@Request() req, @Response() res) {
    const cookies = req.cookies;

    if (!cookies) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    return res.json(cookies);
  }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('accessToken');
    res.clearCookie('userId');
    return res.json({ message: 'Logged out successfully' });
  }
}
