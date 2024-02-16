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

  async create(data: CreateTaskDTO, user_id: number): Promise<ResultDto> {
    const user = await this.userService.isActivated(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const task = await this.taskRepository.save({
      ...data,
      user: { id: user_id },
    });

    return {
      message: 'Task created',
      status: HttpStatus.CREATED,
    };
    
  }

  async findAllByUser(user_id: number): Promise<ReturnTaskDTO[]> {
    const user = await this.userService.isActivated(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const tasks = await this.taskRepository.find({
      where: { user: { id: user_id }, active: true },
    });
    return tasks.map((task) => new ReturnTaskDTO(task));
  }

  async update(
    id: number,
    data: UpdateTaskDto,
    user_id: number,
  ): Promise<ReturnTaskDTO> {
    const taskExist = await this.taskRepository.findOne({
      where: { id, active: true },
      relations: ['user'],
    });
    if (!taskExist || taskExist.user.id !== user_id) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.isActivated(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.taskRepository.update(id, data);
    const task = await this.taskRepository.findOne({ where: { id } });

    return new ReturnTaskDTO(task);
  }

  async delete(id: number, user_id: number): Promise<Object> {
    const taskExist = await this.taskRepository.findOne({
      where: { id, active: true },
      relations: ['user'],
    });
    if (!taskExist || taskExist.user.id !== user_id) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.isActivated(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.taskRepository.update(id, { active: false });

    return {
      message: 'Task deleted',
      status: HttpStatus.OK,
    };
  }
}
