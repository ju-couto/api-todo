import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import {
  activeMockUser,
  createMockUser,
  desactivateMockUser,
  updateUser,
} from './user.mock';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

describe('service of user', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userMock = createMockUser as User;

      jest.spyOn(userRepository, 'create').mockReturnValueOnce(userMock);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userMock);

      const result = await userService.create(createMockUser);

      expect(result).toBeDefined();
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(result.statusCode).toBe(201);
      expect(result.message).toBe('User created');
    });

    it('should throw an error if user already exists', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(activeMockUser);

      try {
        await userService.create(createMockUser);
      } catch (error) {
        expect(error).toBeDefined();
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
        expect(userRepository.create).not.toHaveBeenCalled();
        expect(userRepository.save).not.toHaveBeenCalled();
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.CONFLICT);
        expect(error.message).toBe('User already exists');
      }
    });

    it('should reactivate a user if it already exists but is inactive', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(desactivateMockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce(undefined);

      const result = await userService.create(createMockUser);

      expect(result).toBeDefined();
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('User reactivated');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(activeMockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce(undefined);

      const result = await userService.update(1, updateUser);

      expect(result).toBeDefined();

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('User updated');
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      try {
        await userService.update(1, updateUser);
      } catch (error) {
        expect(error).toBeDefined();
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
        expect(userRepository.update).not.toHaveBeenCalled();
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe('User not found');
      }
    });

    it('should throw an error if email already exists', async () => {
      activeMockUser.email = updateUser.email;

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(activeMockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce(undefined);

      try {
        await userService.update(2, updateUser);
      } catch (error) {
        expect(error).toBeDefined();
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
        expect(userRepository.update).not.toHaveBeenCalled();
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.CONFLICT);
        expect(error.message).toBe('This email already exists');
      }
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(activeMockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce(undefined);

      const result = await userService.delete(1);

      expect(result).toBeDefined();
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('User deleted');
    });
    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce(undefined);

      try {
        await userService.delete(1);
      } catch (error) {
        expect(error).toBeDefined();
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
        expect(userRepository.update).not.toHaveBeenCalled();
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe('User not found');
      }
    });
  });
});
