import { IPerson } from './person';

const REGEX = /\d+/g;

export class CharacterDto {
  id: number;
  isFavorite: boolean;
  name: string;
  image: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: number;
  mass: number;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];

  constructor(person: IPerson) {
    this.id = parseInt(person.url.match(REGEX)[0]);
    this.name = person.name;
    this.isFavorite = false;
    this.image = this.changeToImageAddress(person.url, 'characters');
    this.birth_year = person.birth_year;
    this.eye_color = person.eye_color;
    this.gender = person.gender;
    this.hair_color = person.hair_color;
    this.height = parseInt(person.height);
    this.mass = parseInt(person.mass);
    this.skin_color = person.skin_color;
    this.homeworld = this.changeToImageAddress(person.homeworld, 'planets');
    this.films = person.films.map((film) =>
      this.changeToImageAddress(film, 'films'),
    );
    this.species = person.species.map((specie) =>
      this.changeToImageAddress(specie, 'species'),
    );
    this.starships = person.starships.map((starship) =>
      this.changeToImageAddress(starship, 'starships'),
    );
    this.vehicles = person.vehicles.map((vehicle) =>
      this.changeToImageAddress(vehicle, 'vehicles'),
    );
  }

  private changeToImageAddress(url: string, group: string): string {
    const sufixRegex = /\d+/g;
    const baseUrl = 'https://starwars-visualguide.com/assets/img';

    return `${baseUrl}/${group}/${url.match(sufixRegex).join('')}.jpg`;
  }
}
