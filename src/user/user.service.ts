import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserEntity } from './user.entity';
import { UserUpdateDto } from './dto/use-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserDataDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login,
      };
    });
  }

  async create(userCreate: UserCreateDto): Promise<UserDataDto> {
    const userEntity: UserEntity = new UserEntity();
    userEntity.name = userCreate.name;
    userEntity.login = userCreate.login;
    userEntity.email = userCreate.email;
    userEntity.password = userCreate.password;

    const newUserEntity = await this.userRepository.save(userEntity);

    return {
      id: newUserEntity.id,
      name: newUserEntity.name,
      login: newUserEntity.login,
    };
  }

  async update(id: string, userUpdate: UserUpdateDto): Promise<UserDataDto> {
    const userEntity = await this.userRepository.findOneBy({ id });

    Object.keys(userUpdate).forEach(
      (key) => (userEntity[key] = userUpdate[key]),
    );

    const updateUserEntity = await this.userRepository.save(userEntity);
    return {
      id: updateUserEntity.id,
      name: updateUserEntity.name,
      login: updateUserEntity.login,
    };
  }

  async delete(id: string) {
    await this.userRepository.delete({ id });
  }
}
