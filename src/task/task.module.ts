import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserService } from '../user/user.service';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([User]), UserModule],
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
