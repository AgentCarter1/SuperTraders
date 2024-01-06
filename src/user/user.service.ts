import { Injectable, Inject } from '@nestjs/common';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.create<User>(user);
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findByPk<User>(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>();
  }

  async update(id: number, updatedUser: Partial<User>): Promise<number> {
    const [affectedCount] = await this.userRepository.update(updatedUser, {
      where: { userID: id },
    });
    return affectedCount;
  }

  async remove(id: number): Promise<number> {
    const deletedCount = await this.userRepository.destroy({
      where: { userID: id },
    });
    return deletedCount;
  }
}
