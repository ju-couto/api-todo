import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO, ReturnCreateTaskDTO } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async create(
    data: CreateTaskDTO,
    user_id: number,
  ): Promise<ReturnCreateTaskDTO> {
    const task = await this.taskRepository.save({ ...data, user_id });

    return new ReturnCreateTaskDTO(task);
  }
}
