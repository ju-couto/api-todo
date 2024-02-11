import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [...userProviders, UserService]
})
export class UserModule {}
