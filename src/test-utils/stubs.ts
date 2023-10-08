import { AxiosResponse } from 'axios';
import { CharacterDto } from 'src/character/dto/character.dto';
import { FavoriteDto } from 'src/character/dto/favorite.dto';
import { IPeople } from 'src/character/dto/people';
import { IPerson } from 'src/character/dto/person';

export const PERSON: IPerson = {
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

export const PEOPLE: IPeople = {
  count: 1,
  next: null,
  previous: null,
  results: [PERSON],
};

export function axiosResponse<T>(data: T): AxiosResponse<T, any> {
  return {
    data,
    status: 200,
    statusText: '',
    headers: {},
    config: { url: '', headers: null },
  };
}

export const CHARACTER: CharacterDto = {
  id: 1,
  name: 'Luke Skywalker',
  urlBase: 'https://starwars-visualguide.com/assets/img',
  isFavorite: false,
  image: { files: '1.jpg', path: 'characters' },
  birth_year: '19BBY',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'blond',
  height: 172,
  mass: 77,
  skin_color: 'fair',
  homeworld: { files: '1.jpg', path: 'planets' },
  films: {
    path: 'films',
    files: ['1.jpg', '2.jpg', '3.jpg', '6.jpg'],
  },
  species: {
    path: 'species',
    files: [],
  },
  starships: {
    path: 'starships',
    files: ['12.jpg', '22.jpg'],
  },
  vehicles: {
    path: 'vehicles',
    files: ['14.jpg', '30.jpg'],
  },
};
