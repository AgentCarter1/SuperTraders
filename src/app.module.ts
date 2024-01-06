import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ShareModule } from './share/share.module';
import { PortfolioService } from './portfolio/portfolio.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { TransactionModule } from './transaction/transaction.module';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    ShareModule,
    PortfolioModule,
    TransactionModule,
    UsersModule,
  ],
  providers: [PortfolioService],
})
export class AppModule {}
