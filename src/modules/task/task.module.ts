import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { taskProviders } from './task.providers';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [...taskProviders, TaskService],
})
export class TaskModule {}
