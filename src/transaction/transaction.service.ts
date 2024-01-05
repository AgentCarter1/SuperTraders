import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './model/transaction.model';
import { BuyDto } from './dto/buy.dto';
import { SellDto } from './dto/sell.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
  ) {}

  async buyShares(buyDto: BuyDto) {
    // const { userId, symbol, quantity } = buyDto;
    // // Retrieve user's portfolio
    // const portfolio = await this.portfolioRepository.findOne({ userId });
    // // Retrieve the share based on the symbol
    // const share = await this.sharesRepository.findOne({ symbol });
    // // Check if the share exists and has enough quantity
    // if (!share || share.quantity < quantity) {
    //   throw new Error('Share not available or quantity too high');
    // }
    // // Calculate the total cost
    // const totalCost = share.currentPrice * quantity;
    // // Check if the user has enough funds
    // if (portfolio.balance < totalCost) {
    //   throw new Error('Insufficient funds');
    // }
    // // Update the user's portfolio
    // await this.portfolioRepository.update(portfolio.id, {
    //   balance: portfolio.balance - totalCost,
    // });
    // // Create a new transaction
    // const transaction = this.transactionsRepository.create({
    //   portfolioId: portfolio.id,
    //   symbol: share.symbol,
    //   type: 'BUY',
    //   quantity,
    //   price: share.currentPrice,
    //   dateTime: new Date(),
    // });
    // // Save the transaction
    // await this.transactionsRepository.save(transaction);
    // // Update the share quantity
    // await this.sharesRepository.update(share.id, {
    //   quantity: share.quantity - quantity,
    // });
    // return transaction;
  }

  async sellShares(sellDto: SellDto) {
    // Logic for selling shares
  }

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    return this.transactionRepository.create<Transaction>(transaction);
  }

  async findOneById(id: number): Promise<Transaction | null> {
    return this.transactionRepository.findByPk<Transaction>(id);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll<Transaction>();
  }

  async update(
    id: number,
    updatedTransaction: Partial<Transaction>,
  ): Promise<number> {
    const [affectedCount] = await this.transactionRepository.update(
      updatedTransaction,
      {
        where: { transactionID: id },
      },
    );
    return affectedCount;
  }

  async remove(id: number): Promise<number> {
    const deletedCount = await this.transactionRepository.destroy({
      where: { transactionID: id },
    });
    return deletedCount;
  }
}
