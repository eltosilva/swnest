import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(login: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: login.email });

    if (user?.password !== login.password) throw new UnauthorizedException();

    const payload: Payload = { username: user.login, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
