import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO, UpdateTaskDto } from './task.dto';
import { User } from '../decorators/user.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() data: CreateTaskDTO, @User() user_id: number) {
    return await this.taskService.create(data, user_id);
  }

  @Get()
  async findAll(@User() user_id: number) {
    const tasks = await this.taskService.findAllByUser(user_id);
    return tasks;
  }

  @Patch(':id')
  async update(@User() user_id: number, @Body() data: UpdateTaskDto, @Param('id') id: number) {
    return await this.taskService.update(id, data, user_id);
  }

  @Delete(':id')
  async delete(@User() user_id: number, @Param('id') id: number) {
    return await this.taskService.delete(id, user_id);
  }
}
