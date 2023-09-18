import { Test } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { UserService } from '../user/user.service';
import { typeOrmSqliteTestModuleTest } from '../test-utils/typeOrmSqliteTestModule';
import { UserEntity } from '../user/user.entity';
import { FavoriteCharacterEntity } from './favorite-character.entity';
import { IPerson } from './dto/person';
import { IPeople } from './dto/people';
import { HttpService } from '@nestjs/axios';
import { createObservable } from '../test-utils/character-observable';
import { CharacterDto } from './dto/character.dto';

describe(CharacterService.name, () => {
  const person: IPerson = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/',
    ],
    species: [],
    vehicles: [
      'https://swapi.dev/api/vehicles/14/',
      'https://swapi.dev/api/vehicles/30/',
    ],
    starships: [
      'https://swapi.dev/api/starships/12/',
      'https://swapi.dev/api/starships/22/',
    ],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  };

  const people: IPeople = {
    count: 1,
    next: null,
    previous: null,
    results: [person],
  };

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
              if (url.includes('search')) return createObservable(people);
              else return createObservable(person);
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

  it(`#${CharacterService.prototype.searchByName.name} should return an array of ${CharacterDto.name}`, async () => {
    const character = await characterService.searchByName('luke');

    expect(character.length).toEqual(1);
    expect(character[0].name).toEqual('Luke Skywalker');
  });

  it(`#${CharacterService.prototype.getFavorites.name} should return favorite characters`, async () => {
    const user = await userService.create({
      name: 'Elto Oliveira',
      login: 'elto',
      email: 'elto@mail.com',
      password: '12345',
    });

    await characterService.markCharacterAsFavorite({
      characterId: 1,
      userId: user.id,
    });
    const favorites = await characterService.getFavorites(user.id);

    expect(favorites.length).toEqual(1);
  });
});
