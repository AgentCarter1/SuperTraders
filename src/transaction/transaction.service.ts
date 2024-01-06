import { Injectable, Inject } from '@nestjs/common';
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

  async calculateTotalShares(
    symbol: string,
    portfolioID: number,
  ): Promise<number> {
    const buyTransactions = await this.transactionRepository.findAll({
      where: { portfolioID, symbol, type: 'BUY' },
    });

    const sellTransactions = await this.transactionRepository.findAll({
      where: { portfolioID, symbol, type: 'SELL' },
    });

    const totalBought = buyTransactions.reduce((sum, t) => sum + t.quantity, 0);
    const totalSold = sellTransactions.reduce((sum, t) => sum + t.quantity, 0);

    return totalBought - totalSold;
  }

  async buyShares(buyDto: BuyDto) {
    const { userId, symbol, quantity } = buyDto;
    // Retrieve user's portfolio
    const portfolio = await this.portfolioRepository.findOne({
      where: { userID: userId },
    });
    //console.log(portfolio);

    // Retrieve the share based on the symbol
    const share = await this.shareRepository.findOne({
      where: { symbol },
    });

    //console.log('SHAREEEEEEEE:', share);

    if (!share || share.quantity < quantity) {
      throw new Error('Share not available or quantity too high');
    }

    const totalCost = share.currentPrice * quantity;

    console.log(totalCost);
    console.log(portfolio.balance);

    if (portfolio.balance < totalCost) {
      throw new Error('Insufficient funds');
    }

    await this.portfolioRepository.update(
      { balance: portfolio.balance - totalCost },
      { where: { portfolioID: portfolio.portfolioID } },
    );
    console.log(portfolio.portfolioID);

    // Create a new transaction
    const transactionInstance = this.transactionRepository.build({
      portfolioID: portfolio.portfolioID,
      symbol: share.symbol,
      type: 'BUY',
      quantity,
      price: share.currentPrice,
      dateTime: new Date(),
    });

    // Save the transaction
    await transactionInstance.save();

    // Update the share quantity
    await share.update({ quantity: share.quantity - quantity });

    // return transactionInstance;
  }

  async sellShares(sellDto: SellDto) {
    const { userId, symbol, quantity } = sellDto;

    // Retrieve user's portfolio
    const portfolio = await this.portfolioRepository.findOne({
      where: { userID: userId },
    });
    if (!portfolio) throw new Error('Portfolio not registered');

    // Retrieve the share based on the symbol
    const share = await this.shareRepository.findOne({ where: { symbol } });
    if (!share) throw new Error('Share not registered');

    // Calculate total shares owned by the user
    const totalSharesOwned = await this.calculateTotalShares(
      symbol,
      portfolio.portfolioID,
    );

    // Check if there are enough shares to sell
    if (totalSharesOwned < quantity) {
      throw new Error('Not enough shares to sell');
    }

    const totalRevenue = share.currentPrice * quantity;
    const newBalance = Number(portfolio.balance) + totalRevenue;

    // Update user's portfolio balance
    await this.portfolioRepository.update(
      { balance: newBalance },
      { where: { portfolioID: portfolio.portfolioID } },
    );

    // Create a new transaction for selling
    const transactionInstance = await this.transactionRepository.create({
      portfolioID: portfolio.portfolioID,
      symbol,
      type: 'SELL',
      quantity,
      price: share.currentPrice,
      dateTime: new Date(),
    });

    // Update the share quantity in the database
    // This assumes that the 'quantity' in the Shares table represents the total available shares in the market
    // If it represents the company's shares, then this step is not necessary
    await share.update({ quantity: share.quantity + quantity });

    return transactionInstance;
  }
}
