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
        dialect: 'postgres', // specifying the dialect
        host: process.env.POSTGRES_DB_HOST, // database host, e.g., 'localhost'
        port: parseInt(process.env.POSTGRES_PORT, 10), // database port, e.g., 5432
        username: process.env.POSTGRES_USER, // database username
        password: process.env.POSTGRES_PASSWORD, // database password
        database: process.env.POSTGRES_DB, // database name
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
