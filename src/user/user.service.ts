import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserEntity } from './user.entity';
import { UserExistsDto } from './dto/user-exists.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userCreate: UserCreateDto): Promise<UserDataDto> {
    const userEntity: UserEntity = UserEntity.of(userCreate);

    return UserDataDto.of(await this.userRepository.save(userEntity));
  }

  async exists(email: string, login: string): Promise<UserExistsDto> {
    const existsDto = new UserExistsDto();

    if (email) {
      const user = await this.userRepository.findOneBy({ email });
      existsDto.email = !!user;
    }

    if (login) {
      const user = await this.userRepository.findOneBy({ login });
      existsDto.login = !!user;
    }

    return existsDto;
  }
}
