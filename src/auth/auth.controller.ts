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

// const accessTokenLinkedin =
//   'AQVUt8EcacX8EefnZRROpIaOzTrf432nTSvxCHZk6cER0yZc0dk-CRho252GzUNirXpUaSVZINn3Yj8i3bNzj8-JogP4IC-4yb_MBq2VSRB07-viE4Fn_ExxXiRzNN6tF_9DjDetRaIEHcN1ljgn5oWA9SLLHb5yrXmhD_snamfvFUEdNkl6MV8JNt3OVUER2sIxjaOtQh_WhFmxHmxZPWtMOFt9SHextMLqla9WWn4K1WeVG9d2JVkH2NhHUsr4RsTxnQENC9GEqkPU2GdvdqiRfcK9xL_5qPHN7j-jfJ8vM5ZfCoOu6ct46KZbvEgelioTMHrYZy3WjWGKqLEvxed1cMNKNQ';
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
    console.log(req.user);

    const userWithTokens = await this.authService.validateUser(req.user);

    res.cookie('accessToken', userWithTokens.accessToken, {
      httpOnly: true, // Доступ только через HTTP (JavaScript не сможет читать)
      secure: false, // Установите true, если используете HTTPS
      sameSite: 'lax', // Защита от CSRF-атак
      maxAge: 24 * 60 * 60 * 1000, // Время жизни куки (1 день)
    });

    // res.cookie('refreshToken', user.refreshToken, {
    //   httpOnly: true, // Доступ только через HTTP (JavaScript не сможет читать)
    //   secure: false, // Установите true, если используете HTTPS
    //   sameSite: 'lax', // Защита от CSRF-атак
    //   maxAge: 24 * 60 * 60 * 1000, // Время жизни куки (1 день)
    // });

    res.cookie('userId', userWithTokens.user.id, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(`http://localhost:3000`);
  }

  // @UseGuards(AuthGuard('github'))
  // @Get('github')
  // github() {
  //   return 'Redirecting to GitHub...';
  // }

  // @UseGuards(AuthGuard('github'))
  // @Get('github/callback')
  // async githubCallback(@Request() req, @Response() res) {
  //   const user = await this.authService.validateUser(req.user.profile);

  //   res.cookie('accessToken', req.user.accessToken, {
  //     httpOnly: true, // Доступ только через HTTP (JavaScript не сможет читать)
  //     secure: false, // Установите true, если используете HTTPS
  //     sameSite: 'lax', // Защита от CSRF-атак
  //     maxAge: 24 * 60 * 60 * 1000, // Время жизни куки (1 день)
  //   });

  //   res.cookie('refreshToken', req.user.refreshToken, {
  //     httpOnly: true, // Доступ только через HTTP (JavaScript не сможет читать)
  //     secure: false, // Установите true, если используете HTTPS
  //     sameSite: 'lax', // Защита от CSRF-атак
  //     maxAge: 24 * 60 * 60 * 1000, // Время жизни куки (1 день)
  //   });

  //   res.cookie('userId', user.id, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     maxAge: 24 * 60 * 60 * 1000,
  //   });

  //   return res.redirect(`http://localhost:3000`);
  // }

  @Get('logout')
  logout(@Response() res) {
    res.clearCookie('jwt');
    return res.json({ message: 'Logged out successfully' });
  }
}
