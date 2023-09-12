import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { SqliteConfigService } from './configations/sqlite.config.service';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: SqliteConfigService,
      inject: [SqliteConfigService],
    }),
    UserModule,
    CharacterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
