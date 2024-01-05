import { Injectable, Inject } from '@nestjs/common';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private catsRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.catsRepository.findAll<User>();
  }
}
