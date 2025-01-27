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

    const token = await this.authService.login(user);

    // return res.json({ token });

    // URL фронтенда, на который будет редирект
    const frontendUrl = `http://localhost:3000`;
    console.log(res);

    // Редирект с токеном в query-параметре

    return res.redirect(`${frontendUrl}?token=${token.accessToken}`);
  }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('jwt');
    return res.json({ message: 'Logged out successfully' });
  }
}
