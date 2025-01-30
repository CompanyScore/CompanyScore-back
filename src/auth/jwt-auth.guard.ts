import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   handleRequest(err, user, info) {
//     console.log('JWT Auth Guard вызван');
//     if (err) {
//       throw err;
//     }
//     if (!user) {
//       throw new Error('No user found');
//     }
//     return user;
//   }
// }
