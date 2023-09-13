import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { HttpModule } from '@nestjs/axios';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteCharacterEntity } from './favorite-character.entity';

import { UserEntity } from 'src/user/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([FavoriteCharacterEntity, UserEntity]),
    AuthModule,
  ],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
