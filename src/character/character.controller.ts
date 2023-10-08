import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { FavoriteStatusDto } from './dto/favorite.dto';
import { CharacterDto } from './dto/character.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as RequestExpress } from 'express';
import { Payload } from 'src/auth/payload';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @ApiHeaders([{ name: 'Autorization', example: 'Bearer <token>' }])
  @Get()
  async searchByName(@Query('name') name: string): Promise<CharacterDto[]> {
    return await this.characterService.searchByName(name);
  }

  @Get('favorites')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'Autorization' }])
  async getFavorites(@Request() request: RequestExpress) {
    const payload: Payload = request['user'];

    return this.characterService.getFavorites(payload?.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'Autorization' }])
  async changeFavoriteStatus(
    @Param('id') characterId: number,
    @Body() status: FavoriteStatusDto,
    @Request() request,
  ) {
    const { user } = request;

    return await this.characterService.changeFavoriteStatus(
      user?.sub,
      characterId,
      status,
    );
  }
}
