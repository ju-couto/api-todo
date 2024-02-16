import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDTO } from './user.dto';

export const createMockUser: CreateUserDTO = {
  name: 'Test User',
  email: 'test@user.com',
  password: 'password',
};
