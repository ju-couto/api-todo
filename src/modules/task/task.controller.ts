import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './task.dto';
import { User } from '../../decorators/user.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() data: CreateTaskDTO, @User() user_id: number) {
    return this.taskService.create(data, user_id);
  }

  // @Get()
  // async findOne(@User() id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Patch()
  // async update(@User() id: number, @Body() data: UpdateUserDto) {
  //   return this.userService.update(id, data);
  // }

  // @Delete()
  // async delete(@User() id: number) {
  //   return this.userService.delete(id);
  // }
}
