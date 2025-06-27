import {
  Controller,
  Get,
  Response,
  Request,
  UseGuards,
  Post,
  BadRequestException,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import * as ms from 'ms';
import { LinkedinAuthGuard } from 'src/guards/linkedin-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req, @Response() res) {
    const user = req.user;
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('15m'),
    });

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true, // Запрещает доступ через JS
      secure: isProd, // Только HTTPS в проде
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('7d'),
    });

    res.cookie('userId', user.user.id, {
      httpOnly: true,
      secure: isProd, // Только HTTPS в проде
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('7d'),
    });

    return res.json({
      success: true,
    });
  }

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerDto: RegisterDto, @Response() res) {
    const userWithTokens = await this.authService.registerUser(registerDto);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', userWithTokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('15m'),
    });

    res.cookie('refreshToken', userWithTokens.refreshToken, {
      httpOnly: true, // Запрещает доступ через JS
      secure: isProd, // Только HTTPS в проде
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('7d'),
    });

    res.cookie('userId', userWithTokens.user.id, {
      httpOnly: true,
      secure: isProd, // Только HTTPS в проде
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? '.companyscore.net' : undefined,
      maxAge: ms('7d'),
    });

    return res.json({
      success: true,
    });
  }

  @Public()
  @UseGuards(LinkedinAuthGuard)
  @Get('linkedin')
  async linkedin(@Query('returnUrl') returnUrl?: string) {
    return { message: 'ok', returnUrl };
  }

  @Public()
  @UseGuards(LinkedinAuthGuard)
  @Get('linkedin/callback')
  async linkedinCallback(@Request() req, @Response() res) {
    const redirectUrl =
      (req.query.state as string) || `${process.env.FRONT_URL}/profile`;
    const userData = await this.authService.validateUserByLinkedin(req.user);
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

    return res.redirect(redirectUrl);
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
