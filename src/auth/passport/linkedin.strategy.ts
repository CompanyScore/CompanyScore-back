import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('LINKEDIN_CLIENT_ID'), // '7865ifc7jv2fh4',
      clientSecret: configService.get<string>('LINKEDIN_CLIENT_SECRET'), // 'WPL_AP1.yijh9pslALa7F3va.+aTiQw==',
      callbackURL: configService.get<string>('LINKEDIN_CALLBACK_URL'), // 'http://localhost:8000/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(accessToken: string): Promise<any> {
    try {
      const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching LinkedIn data:', error.message);
      return null;
    }
  }
}
