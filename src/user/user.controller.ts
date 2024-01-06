import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './model/user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOneById(id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedUser: Partial<User>,
  ): Promise<number> {
    return this.usersService.update(id, updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.usersService.remove(id);
  }
}
