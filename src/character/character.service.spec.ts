import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';

import { CharacterService } from './character.service';
import { FavoriteCharacterEntity } from './favorite-character.entity';
import { CharacterDto } from './dto/character.dto';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { typeOrmSqliteTestModuleTest } from '../test-utils/typeOrmSqliteTestModule';
import { CHARACTER, PEOPLE, PERSON, axiosResponse } from '../test-utils/stubs';
import { of } from 'rxjs';

describe(CharacterService.name, () => {
  let characterService: CharacterService;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CharacterService,
        UserService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockImplementation((url: string) => {
              if (url.includes('search')) return of(axiosResponse(PEOPLE));
              else return of(axiosResponse(PERSON));
            }),
          },
        },
      ],
      imports: [
        ...typeOrmSqliteTestModuleTest(UserEntity, FavoriteCharacterEntity),
      ],
    }).compile();

    characterService = module.get<CharacterService>(CharacterService);
    userService = module.get<UserService>(UserService);
  });

  //###################################

  it(`#${CharacterService.prototype.searchByName.name} should return an array of ${CharacterDto.name}`, async () => {
    const character = await characterService.searchByName('luke');

    expect(character.length).toEqual(1);
    expect(character[0]).toEqual(CHARACTER);
  });

  //###################################

  it(`#${CharacterService.prototype.changeFavoriteStatus.name} should add and remove favorite characters`, async () => {
    const user = await userService.create({
      name: 'Elto Oliveira',
      login: 'elto',
      email: 'elto@mail.com',
      password: '12345',
    });

    const favorite = await characterService.changeFavoriteStatus(user.id, 1, {
      isFavorite: true,
    });

    expect(favorite.characterId).toEqual(1);

    const noFavorite = await characterService.changeFavoriteStatus(user.id, 1, {
      isFavorite: false,
    });

    expect(noFavorite).toBeFalsy();
  });
});
