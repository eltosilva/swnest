import { TypeOrmModule } from '@nestjs/typeorm';

export function typeOrmSqliteTestModule(c: Function) {
  return [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      entities: [c],
    }),
    TypeOrmModule.forFeature([c]),
  ];
}
