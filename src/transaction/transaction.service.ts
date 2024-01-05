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

    if (!portfolio) {
      throw new Error('Portfolio not registered');
    }

    // Retrieve the share based on the symbol
    const share = await this.shareRepository.findOne({
      where: { symbol },
    });

    if (!share) {
      throw new Error('Share not registered');
    }

    // Check if the user's portfolio has enough shares to sell
    const portfolioShares = await this.transactionRepository.findAll({
      where: { portfolioID: portfolio.portfolioID, symbol, type: 'BUY' },
      attributes: ['quantity'],
    });

    // Calculate total shares owned by the user
    const totalSharesOwned = portfolioShares.reduce(
      (total, transaction) => total + transaction.quantity,
      0,
    );

    // Check if there are enough shares to sell
    if (totalSharesOwned < quantity) {
      throw new Error('Not enough shares to sell');
    }

    const totalRevenue = share.currentPrice * quantity;

    const newBalance = Number(portfolio.balance) + Number(totalRevenue);

    // Sayısal türdeki yeni bakiyeyi güncelleyin
    await this.portfolioRepository.update(
      { balance: newBalance },
      { where: { portfolioID: portfolio.portfolioID } },
    );
    // Create a new transaction for selling
    const transactionInstance = this.transactionRepository.build({
      portfolioID: portfolio.portfolioID,
      symbol: share.symbol,
      type: 'SELL',
      quantity,
      price: share.currentPrice,
      dateTime: new Date(),
    });

    // Save the sell transaction
    await transactionInstance.save();

    // Update the share quantity in the database
    await share.update({ quantity: share.quantity + quantity });

    return transactionInstance;
  }
}
