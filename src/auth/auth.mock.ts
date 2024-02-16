import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './auth.dto';

export const loginWrongMock: LoginUserDto = {
  email: 'test@example.com',
  password: 'wrongpassword',
};

export const loginMock: LoginUserDto = {
    email: 'test@example.com',
    password: 'correctpassword',
};

export const userMock = {
  id: 1,
  email: loginMock.email,
  password: 'correctpassword',
  active: true,
  name: 'John Doe',
  created_at: new Date(),
  updated_at: new Date(),
};
