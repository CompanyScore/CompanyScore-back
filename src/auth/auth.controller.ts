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
    const userData = await this.authService.validateUser(req.user);
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', userData.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('15m'),
    });

    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true, // Запрещает доступ через JS
      secure: isProd, // Только HTTPS в проде
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('7d'),
    });

    res.cookie('userId', userData.user.id, {
      httpOnly: true,
      secure: isProd, // Только HTTPS в проде
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('7d'),
    });

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
