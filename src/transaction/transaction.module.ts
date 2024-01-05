import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';
import { transactionProviders } from './transaction.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProviders],
})
export class TransactionModule {}
