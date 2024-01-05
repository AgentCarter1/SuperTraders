import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SellDto } from './dto/sell.dto';
import { BuyDto } from './dto/buy.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('buy')
  async buyShares(@Body() buyDto: BuyDto) {
    return this.transactionService.buyShares(buyDto);
  }

  @Post('sell')
  async sellShares(@Body() sellDto: SellDto) {
    return this.transactionService.sellShares(sellDto);
  }
}
