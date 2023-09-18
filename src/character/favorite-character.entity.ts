import { UserEntity } from '../user/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites_characters' })
@Index(['characterId', 'user'], { unique: true })
export class FavoriteCharacterEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'character_id', type: 'int' })
  characterId: number;

  @ManyToOne(() => UserEntity, (user) => user.favoriteCharacters, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;
}
