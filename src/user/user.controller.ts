import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDto } from './user.dto';
import { User } from '../decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findOne(@User() id: number) {
    return this.userService.findOne(id);
  }

  @Patch()
  async update(@User() id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete()
  async delete(@User() id: number) {
    return this.userService.delete(id);
  }
}
