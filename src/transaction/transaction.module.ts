import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';
import { transactionProviders } from './transaction.providers';
import { PortfolioModule } from 'src/portfolio/portfolio.module';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [DatabaseModule, PortfolioModule, ShareModule],
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProviders],
})
export class TransactionModule {}
