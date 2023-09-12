import { TypeOrmModule } from '@nestjs/typeorm';

export function typeOrmSqliteTestModuleTest(...c: Function[]) {
  return [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      entities: [...c],
      migrations: [...c],
      migrationsTableName: 'custom_migration_name',
    }),
    TypeOrmModule.forFeature([...c]),
  ];
}
