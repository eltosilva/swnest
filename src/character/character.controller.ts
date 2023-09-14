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
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FavoriteStatusDto } from './dto/favorite.dto';
import { CharacterDto } from './dto/character.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as RequestExpress } from 'express';
import { Payload } from 'src/auth/payload';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @ApiQuery({ name: 'userId', required: false })
  @Get()
  async findByName(
    @Query('name') name: string,
    @Query('userId') userId: string,
  ): Promise<CharacterDto[]> {
    return await this.characterService.findByName(name, userId);
  }

  @ApiSecurity('token')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'auth-token',
    required: true,
    example: 'Bearer jwt-tokens',
  })
  @UseGuards(AuthGuard)
  @Get('favorites')
  async getFavorites(@Request() request: RequestExpress) {
    const payload: Payload = request['user'];
    return this.characterService.getFavorites(payload?.sub);
  }

  @ApiSecurity('token')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'auth-token',
    required: true,
    example: 'Bearer jwt-tokens',
  })
  @Put(':id')
  @UseGuards(AuthGuard)
  async changeFavoriteStatus(
    @Request() request,
    @Param('id') characterId: number,
    @Body() status: FavoriteStatusDto,
  ) {
    const { user } = request;

    return await this.characterService.changeFavoriteStatus(
      user?.sub,
      characterId,
      status,
    );
  }
}
