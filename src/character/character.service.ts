import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IPeople } from './dto/people';
import { FavoriteDto } from './dto/favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteCharacterEntity } from './favorite-character.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CharacterDto } from './dto/character.dto';
import { IPerson } from './dto/person';
import { UserEntity } from 'src/user/user.entity';

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

  async findByName(name: string): Promise<CharacterDto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<IPeople>(`${this.baseUrl}?search=${name}`),
    );

    return data.results.map((person) => new CharacterDto(person));
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

    return people.map((person) => new CharacterDto(person));
  }

  async markCharacterAsFavorite(favorite: FavoriteDto): Promise<FavoriteDto> {
    const user = await this.userRepository.findOneBy({ id: favorite.userId });

    let favoriteCharacter: FavoriteCharacterEntity = {
      user,
      characterId: favorite.characterId,
    };

    favoriteCharacter = await this.favoriteRepository.save(favoriteCharacter);

    return {
      characterId: favoriteCharacter.characterId,
      userId: favoriteCharacter.user.id,
    };
  }

  async ummarkCharacterAsFavorite(favorite: FavoriteDto) {
    const user = await this.userRepository.findOneBy({ id: favorite.userId });

    const favoriteCharacter: FavoriteCharacterEntity = {
      user,
      characterId: favorite.characterId,
    };

    this.favoriteRepository.delete(favoriteCharacter);
  }
}
