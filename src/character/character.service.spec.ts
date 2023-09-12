import { Test } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { UserService } from '../user/user.service';
import { typeOrmSqliteTestModuleTest } from '../test-utils/typeOrmSqliteTestModule';
import { UserEntity } from '../user/user.entity';
import { FavoriteCharacterEntity } from './favorite-character.entity';
import { IPerson } from './dto/person';
import { IPeople } from './dto/people';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

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

  const axiosResponse: AxiosResponse<IPeople, any> = {
    data: people,
    status: 200,
    statusText: '',
    headers: {},
    config: { url: '', headers: null },
  };

  const observable = new Observable((observer) => {
    setTimeout(() => {
      observer.next(axiosResponse);
    }, 300);
  });

  let characterService: CharacterService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CharacterService,
        UserService,
        {
          provide: HttpService,
          useValue: { get: jest.fn().mockReturnValue(observable) },
        },
      ],
      imports: [
        ...typeOrmSqliteTestModuleTest(UserEntity, FavoriteCharacterEntity),
      ],
    }).compile();

    characterService = module.get<CharacterService>(CharacterService);
  });

  it('teste', async () => {
    const value = await characterService.findByName('luke');
    console.log(value);

    expect(value).toBeTruthy();
  });
});
