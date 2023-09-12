import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { HttpModule } from '@nestjs/axios';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteCharacterEntity } from './favorite-character.entity';

import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([FavoriteCharacterEntity]),
    UserModule,
  ],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
