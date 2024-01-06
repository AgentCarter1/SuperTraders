import { Module, forwardRef } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PortfolioService } from './portfolio.service';
import { portfolioProviders } from './portfolio.providers';
import { TransactionModule } from 'src/transaction/transaction.module';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [DatabaseModule, ShareModule, forwardRef(() => TransactionModule)],
  controllers: [PortfolioController],
  providers: [PortfolioService, ...portfolioProviders],
  exports: [PortfolioService, ...portfolioProviders],
})
export class PortfolioModule {}
