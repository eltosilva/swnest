import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class MySqlConfigService implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      database: process.env['DB_DATABASE'],
      username: process.env['DB_USER'],
      password: process.env['DB_PASSWORD'],
      port: parseInt(process.env['DB_PORT']),
      dropSchema: false,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../**/*.entity.{js,ts}'],
      migrationsTableName: 'custom_migration_name',
    };
  }
}
