import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { Profile } from 'passport';
import { AuthService } from '../auth.service';

const accessTokenLinkedin =
  'AQVUt8EcacX8EefnZRROpIaOzTrf432nTSvxCHZk6cER0yZc0dk-CRho252GzUNirXpUaSVZINn3Yj8i3bNzj8-JogP4IC-4yb_MBq2VSRB07-viE4Fn_ExxXiRzNN6tF_9DjDetRaIEHcN1ljgn5oWA9SLLHb5yrXmhD_snamfvFUEdNkl6MV8JNt3OVUER2sIxjaOtQh_WhFmxHmxZPWtMOFt9SHextMLqla9WWn4K1WeVG9d2JVkH2NhHUsr4RsTxnQENC9GEqkPU2GdvdqiRfcK9xL_5qPHN7j-jfJ8vM5ZfCoOu6ct46KZbvEgelioTMHrYZy3WjWGKqLEvxed1cMNKNQ';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '7865ifc7jv2fh4',
      clientSecret: 'WPL_AP1.yijh9pslALa7F3va.+aTiQw==',
      callbackURL: 'http://localhost:8080/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    console.log('profile', profile);

    const profileData = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessTokenLinkedin}`,
      },
    }).then((res) => res.json());

    console.log('Дополнительные данные профиля:', profileData);

    return { accessToken, refreshToken, profile };
  }
}
