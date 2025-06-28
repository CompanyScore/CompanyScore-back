import {
  Controller,
  Get,
  Response,
  Request,
  UseGuards,
  Post,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { LinkedinAuthGuard } from 'src/guards/linkedin-auth.guard';

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
  @UseGuards(LinkedinAuthGuard)
  @Get('linkedin')
  async linkedin(@Query('returnUrl') returnUrl?: string) {
    return { message: 'ok', returnUrl };
  }

  @Public()
  @UseGuards(LinkedinAuthGuard)
  @Get('linkedin/callback')
  async linkedinCallback(@Request() req, @Response() res) {
    const userData = await this.authService.validateUser(req.user);

    return res.json({
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
      userId: userData.user.id,
    });
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Request() req, @Response() res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token отсутствует');
    }
    const result = await this.authService.refreshAccessToken(refreshToken);
    return res.json(result);
  }

  @Get('logout') // Неиспользуемый метод
  logout(@Response() res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('userId');
  }
}
