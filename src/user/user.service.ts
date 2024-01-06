import { Injectable, Inject } from '@nestjs/common';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create<User>({
      name: createUserDto.name,
      email: createUserDto.email,
    });

    if (createUserDto.portfolios && createUserDto.portfolios.length > 0) {
      const portfolioNames = createUserDto.portfolios.map(
        (portfolio) => portfolio.name,
      );
      await user.$set('portfolios', portfolioNames);
    }

    return user;
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findByPk<User>(id, {
      include: ['portfolios'],
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>({
      include: ['portfolios'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findByPk<User>(id);

    if (!user) {
      return null; // Kullanıcı bulunamadı
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    await user.save();

    return user;
  }

  async remove(id: number): Promise<number> {
    return this.userRepository.destroy({
      where: { userID: id },
    });
  }
}
