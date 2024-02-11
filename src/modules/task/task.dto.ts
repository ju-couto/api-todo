import { Task } from "./task.entity";

export class CreateTaskDTO {
  title: string;
  description: string;
}

export class ReturnCreateTaskDTO {
  title: string;
  description: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;

    constructor(task: Task) {
        this.title = task.title;
        this.description = task.description;
        this.done = task.done;
        this.created_at = task.created_at;
        this.updated_at = task.updated_at;
    }
}