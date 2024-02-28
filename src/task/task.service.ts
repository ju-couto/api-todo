import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO, ReturnTaskDTO, UpdateTaskDto } from './task.dto';
import { UserService } from '../user/user.service';
import { ResultDto } from 'src/dto/result.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  async create(data: CreateTaskDTO, user_id: number): Promise<Task> {
    await this.userService.findOne(user_id);

    const task = await this.taskRepository.create({
      ...data,
      user: { id: user_id },
    });

    return  await this.taskRepository.save(task)
    
  }

  async findAllByUser(user_id: number): Promise<ReturnTaskDTO[]> {
    await this.userService.findOne(user_id);
    const tasks = await this.taskRepository.find({
      where: { user: { id: user_id }, active: true },
    });
    return tasks.map((task) => new ReturnTaskDTO(task));
  }

  async update(
    id: number,
    data: UpdateTaskDto,
    user_id: number,
  ): Promise<ResultDto> {
    await this.findOne(id, user_id);

    await this.userService.findOne(user_id);
  
    await this.taskRepository.update(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: 'Task updated'
    };
    }

  async findOne(id: number, user_id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, active: true },
      relations: ['user'],
    });
    if (!task || task.user.id !== user_id) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }
  async delete(id: number, user_id: number): Promise<ResultDto> {
    await this.findOne(id, user_id);

    await this.userService.findOne(user_id);
  
    await this.taskRepository.update(id, { active: false });

    return {
      statusCode: HttpStatus.OK,
      message: 'Task deleted'
    };
  }
}
