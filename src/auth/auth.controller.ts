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

  @UseGuards(AuthGuard('github'))
  @Get('github')
  github() {
    return 'Redirecting to GitHub...';
  }

  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  async githubCallback(@Request() req, @Response() res) {
    const user = await this.authService.validateUser(req.user.profile);

    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true, // Доступ только через HTTP (JavaScript не сможет читать)
      secure: false, // Установите true, если используете HTTPS
      sameSite: 'lax', // Защита от CSRF-атак
      maxAge: 24 * 60 * 60 * 1000, // Время жизни куки (1 день)
    });

    res.cookie('refreshToken', req.user.refreshToken, {
      httpOnly: true, // Доступ только через HTTP (JavaScript не сможет читать)
      secure: false, // Установите true, если используете HTTPS
      sameSite: 'lax', // Защита от CSRF-атак
      maxAge: 24 * 60 * 60 * 1000, // Время жизни куки (1 день)
    });

    res.cookie('userId', user.id, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(`http://localhost:3000`);
  }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('jwt');
    return res.json({ message: 'Logged out successfully' });
  }
}
