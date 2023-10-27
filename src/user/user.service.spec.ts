import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { FavoriteCharacterEntity } from '../character/favorite-character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe(UserService.name, () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  let favoriteRepository: Repository<FavoriteCharacterEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FavoriteCharacterEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    favoriteRepository = module.get<Repository<FavoriteCharacterEntity>>(
      getRepositoryToken(FavoriteCharacterEntity),
    );
  });

  it(`${UserService.name} shoulb be defined`, () => {
    expect(userService).toBeDefined();
  });
});
