import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'favorites_characters' })
export class FavoriteCharacterEntity {
  @PrimaryColumn({ name: 'swapi_id', type: 'int' })
  characterId: number;

  @ManyToOne(() => UserEntity, (user) => user.favoriteCharacters, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;
}
