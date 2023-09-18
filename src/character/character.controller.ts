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
import { ApiTags } from '@nestjs/swagger';
import { FavoriteStatusDto } from './dto/favorite.dto';
import { CharacterDto } from './dto/character.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as RequestExpress } from 'express';
import { Payload } from 'src/auth/payload';
import { OwnerGuard } from 'src/auth/owner.guard';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async searchByName(@Query('name') name: string): Promise<CharacterDto[]> {
    return await this.characterService.searchByName(name);
  }

  @Get('/user/:userId')
  @UseGuards(AuthGuard, OwnerGuard)
  async searchByNameIdentifyingFavorites(
    @Param('userId') userId: string,
    @Query('name') name: string,
  ) {
    return await this.characterService.searchByNameIdentifyingFavorites(
      userId,
      name,
    );
  }

  @Get('favorites')
  @UseGuards(AuthGuard)
  async getFavorites(@Request() request: RequestExpress) {
    const payload: Payload = request['user'];

    return this.characterService.getFavorites(payload?.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
