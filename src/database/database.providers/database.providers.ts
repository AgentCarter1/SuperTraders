import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import * as dotenv from 'dotenv';
import { Share } from 'src/share/model/share.model';
import { Portfolio } from 'src/portfolio/model/portfolio.model';
import { PortfolioDetail } from 'src/portfolio-detail/model/portfolio-detail.model';
import { Transaction } from 'src/transaction/model/transaction.model';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_DB_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([
        User,
        Share,
        Portfolio,
        PortfolioDetail,
        Transaction,
      ]);
      sequelize.sync({ force: true }).then(() => {
        console.log('Veritabanı senkronize edildi!');
      });
      return sequelize;
    },
  },
];
