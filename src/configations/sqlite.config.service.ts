import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
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
      entities: [UserEntity],
      migrations: [UserEntity],
      migrationsTableName: 'custom_migration_name',
    };
  }
}
