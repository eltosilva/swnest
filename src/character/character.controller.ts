import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteDto } from './dto/favorite.dto';
import { CharacterDto } from './dto/character.dto';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async findByName(@Query('name') name: string): Promise<CharacterDto[]> {
    return await this.characterService.findByName(name);
  }

  @Get('favorites/:userId')
  async getFavorites(@Param('userId') userId: string) {
    return this.characterService.getFavorites(userId);
  }

  @Post()
  async markCharacterAsFavorite(
    @Body() favorite: FavoriteDto,
  ): Promise<FavoriteDto> {
    return this.characterService.markCharacterAsFavorite(favorite);
  }

  @Delete()
  async unmarkCharacterAsFavorite(@Body() favorite: FavoriteDto) {
    this.characterService.ummarkCharacterAsFavorite(favorite);
  }
}
