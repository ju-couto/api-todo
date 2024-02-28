import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDTO, ReturnUserDTO } from './user.dto';

export const createMockUser: CreateUserDTO = {
  name: 'Test User',
  email: 'test@user.com',
  password: 'password',
};

export const updateUser = {
  name: 'Test User Updated',
  email: 'test.update@user.com'
}

export const desactivateMockUser: User = {
  ...createMockUser,
  id: 1,
  active: false,
  created_at: new Date(),
  updated_at: new Date()
}


export const activeMockUser: User = {
  ...createMockUser,
  id: 1,
  active: true,
  password: bcrypt.hashSync('password', 10),
  created_at: new Date(),
  updated_at: new Date()
}
