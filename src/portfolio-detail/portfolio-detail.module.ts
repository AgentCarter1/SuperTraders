import { Module } from '@nestjs/common';
import { PortfolioDetailService } from './portfolio-detail.service';
import { PortfolioDetailController } from './portfolio-detail.controller';

@Module({
  providers: [PortfolioDetailService],
  controllers: [PortfolioDetailController]
})
export class PortfolioDetailModule {}
