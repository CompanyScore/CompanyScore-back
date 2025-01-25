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
    console.log('req.user:', req.user); // Проверяем, что приходит в req.user

    if (!req.user) {
      return res.status(400).json({ message: 'User not found in request' });
    }

    const token = this.authService.login(req.user);
    console.log('Generated token:', token); // Проверяем, что токен создается

    return res.json(token);
  }

  @UseGuards(AuthGuard('github'))
  @Get('github')
  github() {
    return 'Redirecting to GitHub...';
  }

  // @UseGuards(AuthGuard('github'))
  // @Get('github/callback')
  // async githubCallback(@Request() req, @Response() res) {
  //   const { accessToken, refreshToken, profile } = req.user;
  //   const user = await this.authService.validateUser(profile);

  //   return res.json({
  //     accessToken,
  //     refreshToken,
  //     user,
  //   });
  // }

  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  async githubCallback(@Request() req, @Response() res) {
    console.log('req.user:', req.user); // Должен быть заполнен данными пользователя

    const user = await this.authService.validateUser(req.user.profile);

    const token = await this.authService.login(user);

    return res.json({ token });
  }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('jwt');
    return res.json({ message: 'Logged out successfully' });
  }
}
