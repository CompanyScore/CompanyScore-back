import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import axios from 'axios';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '7865ifc7jv2fh4',
      clientSecret: 'WPL_AP1.yijh9pslALa7F3va.+aTiQw==',
      callbackURL: 'http://localhost:8080/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(accessToken: string): Promise<any> {
    let response = null;

    try {
      response = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching LinkedIn data:', error.message);
    }

    return response;
  }
}
