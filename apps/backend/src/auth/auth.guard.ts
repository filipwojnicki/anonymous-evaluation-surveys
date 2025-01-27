import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  override canActivate(context: ExecutionContext): boolean {
    return super.canActivate(context) as boolean;
  }
}
