import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { FavoriteCharacterEntity } from 'src/character/favorite-character.entity';
import { UserEntity } from 'src/user/user.entity';

export class SqliteConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      entities: [UserEntity, FavoriteCharacterEntity],
      migrations: [UserEntity, FavoriteCharacterEntity],
      migrationsTableName: 'custom_migration_name',
    };
  }
}
