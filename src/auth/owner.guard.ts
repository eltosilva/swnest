import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserController } from 'src/user/user.controller';

export class OwnerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { id, userId } = request.params;
    const { user } = request;

    if (context.getClass() === UserController) {
      if (user.sub !== id) throw new ForbiddenException();
    } else {
      if (userId !== user.sub) throw new ForbiddenException();
    }

    return true;
  }
}
