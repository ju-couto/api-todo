import {
    Controller,
    Post,
    Body
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginUserDto } from './auth.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post()
    login(@Body() data: LoginUserDto) {
      return this.authService.login(data);
    }
  }
  