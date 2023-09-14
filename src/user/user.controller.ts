import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/use-update.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { OwnerGuard } from 'src/auth/owner.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserCreateDto): Promise<UserDataDto> {
    return await this.userService.create(user);
  }

  @ApiSecurity('token')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'auth-token',
    required: true,
    example: 'Bearer jwt-tokens',
  })
  @UseGuards(AuthGuard, OwnerGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UserUpdateDto,
  ): Promise<UserDataDto> {
    return await this.userService.update(id, user);
  }

  @ApiSecurity('token')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'auth-token',
    required: true,
    example: 'Bearer jwt-tokens',
  })
  @UseGuards(AuthGuard, OwnerGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
