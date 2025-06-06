import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedinAuthGuard extends AuthGuard('linkedin') {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const returnUrl = req.query.returnUrl as string;
    return {
      state: returnUrl || '/',
    };
  }
}
