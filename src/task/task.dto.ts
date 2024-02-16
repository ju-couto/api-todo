import { Task } from './task.entity';

export class CreateTaskDTO {
  title: string;
  description: string;
}

export class ReturnTaskDTO {
  id: number;
  title: string;
  description: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.done = task.done;
    this.created_at = task.created_at;
    this.updated_at = task.updated_at;
  }
}

export class UpdateTaskDto {
  title: string;
  description: string;
  done: boolean;
}
