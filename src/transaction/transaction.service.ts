import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Transaction } from './model/transaction.model';
import { BuyDto } from './dto/buy.dto';
import { SellDto } from './dto/sell.dto';
import { Portfolio } from 'src/portfolio/model/portfolio.model';
import { Share } from 'src/share/model/share.model';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository: typeof Portfolio,
    @Inject('SHARE_REPOSITORY')
    private shareRepository: typeof Share,
  ) {}

  // Calculate the total shares owned by a user for a given share symbol
  private async calculateTotalShares(
    symbol: string,
    portfolioID: number,
  ): Promise<number> {
    const totalBought = await this.getTotalTransactionQuantity(
      portfolioID,
      symbol,
      'BUY',
    );
    const totalSold = await this.getTotalTransactionQuantity(
      portfolioID,
      symbol,
      'SELL',
    );
    return totalBought - totalSold;
  }

  // Helper method to get total transaction quantity for a specific type (BUY/SELL)
  private async getTotalTransactionQuantity(
    portfolioID: number,
    symbol: string,
    type: string,
  ): Promise<number> {
    const transactions = await this.transactionRepository.findAll({
      where: { portfolioID, symbol, type },
      attributes: ['quantity'],
    });
    return transactions.reduce(
      (sum, transaction) => sum + transaction.quantity,
      0,
    );
  }

  // Method to handle buying shares
  public async buyShares(buyDto: BuyDto): Promise<Transaction> {
    const { userId, symbol, quantity } = buyDto;

    const portfolio = await this.portfolioRepository.findOne({
      where: { userID: userId },
    });
    if (!portfolio)
      throw new HttpException('Portfolio not registered', HttpStatus.NOT_FOUND);

    const share = await this.shareRepository.findOne({ where: { symbol } });
    if (!share || share.quantity < quantity)
      throw new HttpException(
        'Share not available or quantity too high',
        HttpStatus.BAD_REQUEST,
      );

    const totalCost = share.currentPrice * quantity;
    if (portfolio.balance < totalCost)
      throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);

    await this.portfolioRepository.update(
      { balance: portfolio.balance - totalCost },
      { where: { portfolioID: portfolio.portfolioID } },
    );

    return this.createTransaction(
      portfolio.portfolioID,
      'BUY',
      symbol,
      quantity,
      share.currentPrice,
    );
  }

  // Method to handle selling shares
  public async sellShares(sellDto: SellDto): Promise<Transaction> {
    const { userId, symbol, quantity } = sellDto;

    const portfolio = await this.portfolioRepository.findOne({
      where: { userID: userId },
    });
    if (!portfolio)
      throw new HttpException('Portfolio not registered', HttpStatus.NOT_FOUND);

    const share = await this.shareRepository.findOne({ where: { symbol } });
    if (!share)
      throw new HttpException('Share not registered', HttpStatus.NOT_FOUND);

    const totalSharesOwned = await this.calculateTotalShares(
      symbol,
      portfolio.portfolioID,
    );
    if (totalSharesOwned < quantity)
      throw new HttpException(
        'Not enough shares to sell',
        HttpStatus.BAD_REQUEST,
      );

    const totalRevenue = share.currentPrice * quantity;
    await this.portfolioRepository.update(
      { balance: Number(portfolio.balance) + totalRevenue },
      { where: { portfolioID: portfolio.portfolioID } },
    );

    return this.createTransaction(
      portfolio.portfolioID,
      'SELL',
      symbol,
      quantity,
      share.currentPrice,
    );
  }

  // Helper method to create a transaction
  private async createTransaction(
    portfolioID: number,
    type: string,
    symbol: string,
    quantity: number,
    price: number,
  ): Promise<Transaction> {
    return this.transactionRepository.create({
      portfolioID,
      symbol,
      type,
      quantity,
      price,
      dateTime: new Date(),
    });
  }
}
