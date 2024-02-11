import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, ReturnUserDTO, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const userExist = await this.findByEmail(data.email);
    if (userExist) {
      if (userExist.active === false) {
        await this.userRepository.update(userExist.id, { active: true });
        await this.userRepository.update(userExist.id, data);

        return await this.userRepository.findOne({ where: { id: userExist.id } });
      } else {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
    } 

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    return await this.userRepository.save(data);
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

  async update(id: number, data: UpdateUserDto): Promise<ReturnUserDTO> {
    const userExist = await this.findByEmail(data.email);
    if (userExist && userExist.id !== id) {
      throw new HttpException('This email already exists', HttpStatus.CONFLICT);
    } else if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, data);
    const userUpdated = await this.userRepository.findOne({ where: { id } });

    return new ReturnUserDTO(userUpdated);
  }

  async delete(id: number): Promise<Object> {
    const user = await this.userRepository.findOne({
      where: { id, active: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update(id, { active: false });
    return {
      message: 'User deleted',
      status: HttpStatus.OK,
    };
  }
}
