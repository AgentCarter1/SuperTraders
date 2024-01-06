import { Logger } from '@nestjs/common';
import { User } from 'src/user/model/user.model';

const userData = [
  { name: 'Ali', email: 'ali@gmail.com' },
  { name: 'Veli', email: 'veli@gmail.com' },
];

export const seedUsers = async () => {
  const logger = new Logger(seedUsers.name);

  try {
    for (const user of userData) {
      await User.create(user);
    }
    logger.log('Portfolios seeded successfully');
  } catch (error) {
    logger.error('Error seeding portfolios:', error);
  }
};
