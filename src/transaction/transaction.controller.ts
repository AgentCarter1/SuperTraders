import { Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('buy-share')
  async buyShare() {
    return this.transactionService.buyShare();
  }
  @Post('sell-share')
  async sellShare() {
    return this.transactionService.sellShare();
  }
}
