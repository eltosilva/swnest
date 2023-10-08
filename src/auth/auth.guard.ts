import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { Payload } from './payload';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException(request.headers);

    try {
      const payload: Payload = await this.jwtService.verifyAsync<Payload>(
        token,
        {
          secret: jwtConstants.secret,
        },
      );

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Erro na validação do token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization =
      request.headers.authorization ?? request.get('autorization');

    //console.log(request.headers.);
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
