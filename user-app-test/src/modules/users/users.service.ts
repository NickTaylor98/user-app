import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Events } from '../../enums/event';
import { SnsService } from '../sns/sns.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly snsService: SnsService,
  ) {}

  async findAll(params: FindAllUsersDto): Promise<[User[], number]> {
    const { limit, offset, sortBy, sortOrder } = params;
    const [users, count] = await this.usersRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { [sortBy]: sortOrder },
    });

    return [users, count];
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      const isExists = await this.usersRepository.existsBy({ email: user.email });

      if (isExists) {
        throw new HttpException(`User already exists, email=${user.email}`, HttpStatus.CONFLICT);
      }

      user.password = await bcrypt.hash(user.password, 10);

      const newUser = await this.usersRepository.save(user);

      newUser.password = undefined;

      await this.snsService.publishMessage(Events.UserCreated, newUser);
      return newUser;
    } catch (error) {
      this.logger.error(`Error while creating user: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User not found, id=${id}`);
      }

      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const isExists = await this.usersRepository.existsBy({ email: updateUserDto.email });
        if (isExists) {
          throw new HttpException(`User already exists, email=${updateUserDto.email}`, HttpStatus.CONFLICT);
        }
      }

      const updatedUser = await this.usersRepository.save({ ...user, ...updateUserDto });
      await this.snsService.publishMessage(Events.UserUpdated, updatedUser);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error while updating user: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const isExists = await this.usersRepository.existsBy({ id });

      if (!isExists) {
        throw new NotFoundException(`User not found, id=${id}`);
      }

      await this.usersRepository.delete(id);
      await this.snsService.publishMessage(Events.UserDeleted, { userId: id });
    } catch (error) {
      this.logger.error(`Error while deleting user: ${error.message}`);
      throw error;
    }
  }

  async findByEmail(email: string, select: Array<keyof User>): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email }, select });
  }
}
