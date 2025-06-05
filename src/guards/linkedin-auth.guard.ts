import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedinAuthGuard extends AuthGuard('linkedin') {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const returnUrl = req.query.returnUrl as string;

    console.log(`LinkedinAuthGuard: returnUrl = ${returnUrl}`);

    const isValidUrl =
      returnUrl?.startsWith('http://') || returnUrl?.startsWith('https://');

    return {
      state: isValidUrl ? returnUrl : `${process.env.FRONT_URL}/profile`,
    };
  }
}
