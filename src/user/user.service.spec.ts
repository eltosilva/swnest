import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { typeOrmSqliteTestModule } from '../test-utils/typeOrmSqliteTestModule';
import { UserEntity } from './user.entity';
import { UserDataDto } from './dto/user-data.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/use-update.dto';

describe(UserService.name, () => {
  let userService: UserService;
  let userDataOne: UserDataDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...typeOrmSqliteTestModule(UserEntity)],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);

    const userCreate: UserCreateDto = {
      name: 'Elto Oliveira',
      login: 'elto',
      email: 'elto@mail.com',
      password: '12345',
    };

    userDataOne = await userService.create(userCreate);
  });

  it(`#${UserService.prototype.create.name}: should return a ${UserDataDto.name}, when creating a new user`, async () => {
    const userCreate: UserCreateDto = {
      name: 'Elto Silva',
      login: 'eltosilva',
      email: 'eltosilva@mail.com',
      password: '12345',
    };

    const userData = await userService.create(userCreate);

    expect(userData).toBeTruthy();
    expect(userData.id).toBeTruthy();
  });

  it(`#${UserService.prototype.update.name}: should return a ${UserDataDto.name}, when updating a user`, async () => {
    const id = userDataOne.id;
    const userUpdate: UserUpdateDto = {
      name: 'Elto Oliveira da Silva',
    };

    const userData = await userService.update(id, userUpdate);
    expect(userData).toBeTruthy();
    expect(userData).not.toEqual(userDataOne);
  });
});
