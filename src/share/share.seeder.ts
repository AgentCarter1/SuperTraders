import { Logger } from '@nestjs/common';
import { Share } from 'src/share/model/share.model';

const shareData = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 999.99,
    quantity: 10000,
  },
  {
    symbol: 'ETH',
    name: 'Etherium',
    currentPrice: 150.5,
    quantity: 10000,
  },
];

export const seedShares = async () => {
  const logger = new Logger(seedShares.name);
  try {
    for (const share of shareData) {
      await Share.create(share);
    }
    logger.log('Shares seeded successfully');
  } catch (error) {
    logger.error('Error seeding shares:', error);
  }
};
