import { Logger } from '@nestjs/common';
import { Portfolio } from 'src/portfolio/model/portfolio.model';

const portfolioData = [
  {
    userID: 1,
    balance: 1000.0,
  },
  {
    userID: 2,
    balance: 2000.5,
  },
];

export const seedPortfolios = async () => {
  const logger = new Logger(seedPortfolios.name);
  try {
    for (const portfolio of portfolioData) {
      await Portfolio.create(portfolio);
    }
    logger.log('Portfolios seeded successfully');
  } catch (error) {
    logger.error('Error seeding portfolios:', error);
  }
};
