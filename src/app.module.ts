import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ShareService } from './share/share.service';
import { ShareModule } from './share/share.module';
import { PortfolioService } from './portfolio/portfolio.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { TransactionModule } from './transaction/transaction.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ShareModule,
    PortfolioModule,
    TransactionModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ShareService, PortfolioService],
})
export class AppModule {}
