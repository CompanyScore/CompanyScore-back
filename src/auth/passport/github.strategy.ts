import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Profile } from 'passport';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'Iv23liM30DHX5tyyrujy',
      clientSecret: '56e04317e269cb38317db0a1c09cd72355daf2e9',
      callbackURL: `http://localhost:3000/auth/github/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    // Передаем профиль в AuthService

    try {
      const user = await this.authService.validateUser(profile);
      return { accessToken, refreshToken, user };
    } catch (error) {
      console.error('Error during GitHub authentication:', error);
      throw new Error('GitHub authentication failed');
    }
  }
}
