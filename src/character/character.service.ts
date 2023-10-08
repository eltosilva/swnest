import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IPeople } from './dto/people';
import { FavoriteDto, FavoriteStatusDto } from './dto/favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteCharacterEntity } from './favorite-character.entity';
import { Repository } from 'typeorm';
import { CharacterDto } from './dto/character.dto';
import { IPerson } from './dto/person';
import { UserEntity } from '../user/user.entity';
import { AxiosResponse } from 'axios';

@Injectable()
export class CharacterService {
  private readonly baseUrl = 'https://swapi.dev/api/people';
  // private readonly baseUrl = 'http://localhost:3003/people';
  private readonly logger = new Logger(CharacterService.name);

  constructor(
    @InjectRepository(FavoriteCharacterEntity)
    private readonly favoriteRepository: Repository<FavoriteCharacterEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly httpService: HttpService,
  ) {}

  async searchByName(name: string): Promise<CharacterDto[]> {
    let people: IPeople;
    try {
      const { data } = await firstValueFrom<AxiosResponse>(
        this.httpService.get<IPeople>(`${this.baseUrl}?search=${name}`),
      );

      people = data;
    } catch (erro) {
      throw new HttpException(erro.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return people.results.map((person) => this.mapPersonToCharacter(person));
  }

  private mapPersonToCharacter(person: IPerson): CharacterDto {
    const regex = /\d+/;
    const id = parseInt(person.url.match(regex).join(''));

    return {
      urlBase: 'https://starwars-visualguide.com/assets/img',
      id,
      name: person.name,
      isFavorite: false,
      birth_year: person.birth_year,
      eye_color: person.eye_color,
      gender: person.gender,
      hair_color: person.hair_color,
      height: parseInt(person.height),
      image: {
        path: 'characters',
        files: `${id}.jpg`,
      },
      films: {
        path: 'films',
        files: person.films.map((film) => film.match(regex).join('') + '.jpg'),
      },
      homeworld: {
        path: 'planets',
        files: person.homeworld.match(regex).join('') + '.jpg',
      },
      mass: parseFloat(person.mass),
      skin_color: person.skin_color,
      species: {
        path: 'species',
        files: person.species.map(
          (specie) => specie.match(regex).join('') + '.jpg',
        ),
      },
      starships: {
        path: 'starships',
        files: person.starships.map(
          (ship) => ship.match(regex).join('') + '.jpg',
        ),
      },
      vehicles: {
        path: 'vehicles',
        files: person.vehicles.map(
          (vehicle) => vehicle.match(regex).join('') + '.jpg',
        ),
      },
    };
  }

  async searchByNameIdentifyingFavorites(userId: string, name: string) {
    const characters = await this.searchByName(name);

    const user = await this.userRepository.findOneBy({ id: userId });
    const charactersEntity = await this.favoriteRepository.findBy({ user });

    characters.forEach(
      (character) =>
        (character.isFavorite = charactersEntity.some(
          (ce) => ce.characterId === character.id,
        )),
    );

    return characters;
  }

  async getFavorites(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    const favorites = await this.favoriteRepository.findBy({ user });

    const people = await Promise.all(
      favorites.map(async (favorite) => {
        const { data } = await firstValueFrom(
          this.httpService.get<IPerson>(
            `${this.baseUrl}/${favorite.characterId}`,
          ),
        );

        return data;
      }),
    );

    return people.map((person) => {
      const character = this.mapPersonToCharacter(person);
      character.isFavorite = true;

      return character;
    });
  }

  async changeFavoriteStatus(
    userId: string,
    characterId: number,
    status: FavoriteStatusDto,
  ): Promise<FavoriteDto> {
    const favorite: FavoriteCharacterEntity = {
      user: await this.userRepository.findOneBy({ id: userId }),
      characterId,
    };

    let favoriteSave: FavoriteCharacterEntity;
    if (status.isFavorite)
      favoriteSave = await this.favoriteRepository.save(favorite);
    else await this.favoriteRepository.delete(favorite);

    if (!favoriteSave) return;

    return {
      characterId: favoriteSave.characterId,
      userId: favoriteSave.user.id,
    };
  }
}
