import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Share } from 'src/share/model/share.model';
import { Portfolio } from 'src/portfolio/model/portfolio.model';
import { Transaction } from 'src/transaction/model/transaction.model';
import { seedUsers } from 'src/user/user.seeder';
import { seedShares } from 'src/share/share.seeder';
import { seedPortfolios } from 'src/portfolio/portfolio.seeder';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.get<string>('postgreDb'));
      sequelize.addModels([User, Share, Portfolio, Transaction]);
      sequelize.sync({ force: true }).then(() => {
        seedUsers();
        seedShares();
        seedPortfolios();
      });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
