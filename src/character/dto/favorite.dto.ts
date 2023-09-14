import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class FavoriteDto {
  @IsPositive()
  characterId: number;
  @IsNotEmpty()
  userId: string;
}

export class FavoriteStatusDto {
  @IsBoolean()
  isFavorite: boolean;
}
