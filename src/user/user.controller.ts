import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/use-update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDataDto[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() user: UserCreateDto): Promise<UserDataDto> {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UserUpdateDto,
  ): Promise<UserDataDto> {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
