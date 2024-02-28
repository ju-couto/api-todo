import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDto } from './user.dto';
import { ResultDto } from 'src/dto/result.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<ResultDto> {
    const userExist = await this.findByEmail(data.email);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    if (userExist) {
      if (userExist.active === false) {
        await this.userRepository.update(userExist.id, {
          ...data,
          active: true,
        });

        return {
          statusCode: HttpStatus.OK,
          message: 'User reactivated',
        };
      } else {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
    }
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created'
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, active: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, data: UpdateUserDto): Promise<ResultDto> {
    const userExist = await this.findOne(id);
    if (userExist && userExist.id !== id) {
      throw new HttpException('This email already exists', HttpStatus.CONFLICT);
    } 

    await this.userRepository.update(id, data);


    return {
      statusCode: HttpStatus.OK,
      message: 'User updated'
    };
  }

  async delete(id: number): Promise<ResultDto> {
    await this.findOne(id);
    await this.userRepository.update(id, { active: false });
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted'
    };
  }
}
