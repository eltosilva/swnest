import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IPeople } from './dto/people';
import { FavoriteDto } from './dto/favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteCharacterEntity } from './favorite-character.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CharacterDto } from './dto/character.dto';
import { IPerson } from './dto/person';

@Injectable()
export class CharacterService {
  private readonly baseUrl = 'https://swapi.dev/api/people';
  // private readonly baseUrl = 'http://localhost:3003/people';
  private readonly logger = new Logger(CharacterService.name);

  constructor(
    @InjectRepository(FavoriteCharacterEntity)
    private readonly favoriteRepository: Repository<FavoriteCharacterEntity>,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  async findByName(name: string): Promise<CharacterDto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<IPeople>(`${this.baseUrl}?search=${name}`),
    );

    return data.results.map((person) => new CharacterDto(person));
  }

  async getFavorites(userId: string) {
    const user = await this.userService.findById(userId);
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

    return people.map((person) => new CharacterDto(person));
  }

  async markCharacterAsFavorite(favorite: FavoriteDto): Promise<FavoriteDto> {
    const user = await this.userService.getUserEntityById(favorite.userId);

    let favoriteCharacter: FavoriteCharacterEntity = {
      user,
      characterId: favorite.characteId,
    };

    favoriteCharacter = await this.favoriteRepository.save(favoriteCharacter);

    return {
      characteId: favoriteCharacter.characterId,
      userId: favoriteCharacter.user.id,
    };
  }

  async ummarkCharacterAsFavorite(favorite: FavoriteDto) {
    const user = await this.userService.getUserEntityById(favorite.userId);

    const favoriteCharacter: FavoriteCharacterEntity = {
      user,
      characterId: favorite.characteId,
    };

    this.favoriteRepository.delete(favoriteCharacter);
  }
}
