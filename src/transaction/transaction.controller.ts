import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './model/transaction.model';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() transactionData: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.transactionService.create(transactionData);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Transaction | null> {
    return this.transactionService.findOneById(id);
  }

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() transactionData: Partial<Transaction>,
  ): Promise<number> {
    return this.transactionService.update(id, transactionData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.transactionService.remove(id);
  }
}
