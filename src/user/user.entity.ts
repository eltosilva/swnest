import { FavoriteCharacterEntity } from '../character/favorite-character.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ name: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'login',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 20, nullable: false })
  password: string;

  @OneToMany(
    () => FavoriteCharacterEntity,
    (favoriteCharacter) => favoriteCharacter.user,
    { cascade: true, eager: true },
  )
  favoriteCharacters: FavoriteCharacterEntity[];
}
