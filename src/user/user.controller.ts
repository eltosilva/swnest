import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserService } from './user.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserExistsDto } from './dto/user-exists.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserCreateDto): Promise<UserDataDto> {
    return await this.userService.create(user);
  }

  @Get('/exists')
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'login', required: false })
  async exists(
    @Query('email') email: string,
    @Query('login') login: string,
  ): Promise<UserExistsDto> {
    return await this.userService.exists(email, login);
  }
}
