import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FavoriteDto } from './dto/favorite.dto';
import { CharacterDto } from './dto/character.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiSecurity('token')
@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async findByName(@Query('name') name: string): Promise<CharacterDto[]> {
    return await this.characterService.findByName(name);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'auth-token',
    required: true,
    example: 'Bearer jwt-tokens',
  })
  @UseGuards(AuthGuard)
  @Get('favorites')
  async getFavorites(@Request() request: Request) {
    const payload = request['user'];
    return this.characterService.getFavorites(payload?.sub);
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
