import {
  Controller,
  Get,
  Response,
  Request,
  UseGuards,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import * as ms from 'ms';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    console.log('req.user:', req.user);

    const userData = await this.authService.validateUser(req.user);

    console.log('userData:', userData);

    res.cookie('accessToken', userData.accessToken, {
      httpOnly: true, // Запрещает доступ через JS
      secure: false, // Только HTTPS в проде
      sameSite: 'lax', // Защита от CSRF
      maxAge: ms('15m'), // 15 мин
    });

    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true, // Запрещает доступ через JS
      secure: false, // Только HTTPS в проде
      sameSite: 'lax', // Защита от CSRF
      maxAge: ms('7d'),
    });

    res.cookie('userId', userData.user.id, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: ms('7d'),
    });

    console.log('Куки установлены!');

    return res.redirect(`${process.env.FRONT_URL}/profile`);
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Request() req, @Response() res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token отсутствует');
    }
    const result = await this.authService.refreshAccessToken(refreshToken, res);
    return res.json(result);
  }

  @Get('logout') // Неиспользуемый метод
  logout(@Response() res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('userId');
  }
}
