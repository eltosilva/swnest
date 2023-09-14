import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { Payload } from './payload';

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
    const [type, token] = request.headers['auth-token'].toString().split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
