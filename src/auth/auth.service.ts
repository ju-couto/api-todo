import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, LoginPayload } from './auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDTO } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginUserDto) {
    const user = await this.usersService.findByEmail(data.email).catch(() => {
      undefined;
    });

    if (!user || user.active === false) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(data.password, user.password || '');

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user.id) }),
      user: new ReturnUserDTO(user),
    };
  }
}
