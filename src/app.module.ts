import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { SqliteConfigService } from './configations/sqlite.config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: SqliteConfigService,
      inject: [SqliteConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
