import { IsEmail, IsString, MinLength } from 'class-validator';
import { User } from './user.entity';
export class CreateUserDTO {
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class ReturnUserDTO {
  id: number;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}

export class UpdateUserDto {
  name: string;
  email: string;
}
