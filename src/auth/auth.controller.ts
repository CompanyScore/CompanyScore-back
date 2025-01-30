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
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

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
    const userWithTokens = await this.authService.validateUser(req.user);

    // return res.json(userWithTokens);

    // return res.redirect(
    //   `http://localhost:3000?userId=${userWithTokens.user.id}`,
    // );

    res.cookie('accessToken', userWithTokens.accessToken, {
      httpOnly: true, // Запрещает доступ через JS
      // secure: process.env.NODE_ENV === 'production', // Только HTTPS в проде
      sameSite: 'lax', // Защита от CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 день
    });

    res.cookie('userId', userWithTokens.user.id, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(`http://localhost:3000`);

    // res.send(`
    //   <script>
    //     window.opener.postMessage({ userId: "${userWithTokens.user.id}" }, "http://localhost:3000");
    //     window.close();
    //   </script>
    // `);
  }

  @Get('me')
  getProfile(@Request() req, @Response() res) {
    const token = req.cookies; // Читаем куку

    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    console.log(token);

    // const userData = this.authService.decodeToken(token); // Декодируем токен
    return res.json(token);
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
