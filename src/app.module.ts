import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ShareService } from './share/share.service';
import { ShareModule } from './share/share.module';
import { PortfolioService } from './portfolio/portfolio.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PortfolioDetailModule } from './portfolio-detail/portfolio-detail.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    DatabaseModule,
    ShareModule,
    PortfolioModule,
    PortfolioDetailModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, ShareService, PortfolioService],
})
export class AppModule {}
