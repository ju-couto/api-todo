import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class ReturnLogin {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export class LoginPayload {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}
