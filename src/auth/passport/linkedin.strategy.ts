import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { Profile } from 'passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '7865ifc7jv2fh4',
      clientSecret: 'WPL_AP1.yijh9pslALa7F3va.+aTiQw==',
      callbackURL: `https://www.linkedin.com/developers/tools/oauth/redirect`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    // console.log('accessToken', accessToken);

    return { accessToken, refreshToken, profile };
  }
}
