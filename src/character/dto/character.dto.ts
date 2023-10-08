import { IPerson } from './person';

const REGEX = /\d+/g;

export class CharacterDto {
  urlBase: string;
  id: number;
  isFavorite: boolean;
  name: string;
  image: ImageDto;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: number;
  mass: number;
  skin_color: string;
  homeworld: ImageDto;
  films: ImageDto;
  species: ImageDto;
  starships: ImageDto;
  vehicles: ImageDto;
}

export class ImageDto {
  path: string;
  files: string | string[];
}
/*
private changeToImageAddress(url: string, group: string): string {
  const sufixRegex = /\d+/g;
  const baseUrl = 'https://starwars-visualguide.com/assets/img';

  return `${baseUrl}/${group}/${url.match(sufixRegex).join('')}.jpg`;
}
*/
