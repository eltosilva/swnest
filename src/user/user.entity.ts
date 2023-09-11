import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ name: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'login', type: 'varchar', length: 20 })
  login: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 50 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 20 })
  password: string;
}
