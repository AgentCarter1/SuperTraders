import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PortfolioService } from './portfolio.service';
import { portfolioProviders } from './portfolio.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, ...portfolioProviders],
  exports: [PortfolioService, ...portfolioProviders],
})
export class PortfolioModule {}
