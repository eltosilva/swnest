import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { AuthModule } from './auth/auth.module';
import { MySqlConfigService } from './configations/mysql.config.service';

@Module({
  imports: [
    UserModule,
    CharacterModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [MySqlConfigService],
      useClass: MySqlConfigService,
    }),
  ],
})
export class AppModule {}
