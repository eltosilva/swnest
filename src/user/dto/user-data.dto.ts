import { ApiProperty } from '@nestjs/swagger';

export class UserDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;
}
