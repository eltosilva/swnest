import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UserDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;

  static of(userEntity: UserEntity): UserDataDto {
    const user = new UserDataDto();
    user.id = userEntity.id;
    user.name = userEntity.name;
    user.login = userEntity.login;

    return user;
  }
}
