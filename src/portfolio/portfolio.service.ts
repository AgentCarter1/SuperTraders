import { Injectable, Inject } from '@nestjs/common';
import { Portfolio } from './model/portfolio.model';
import { Transaction } from 'src/transaction/model/transaction.model';
import { Share } from 'src/share/model/share.model';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository: typeof Portfolio,
    @Inject('SHARE_REPOSITORY')
    private shareRepository: typeof Share,
  ) {}
  async getUserPortfolio(userId: number): Promise<any[]> {
    // Retrieve user's portfolio
    const portfolio = await this.portfolioRepository.findOne({
      where: { userID: userId },
    });
    if (!portfolio) throw new Error('Portfolio not registered');

    // Get all distinct symbols from transactions for this user
    const symbols = await this.transactionRepository.findAll({
      where: { portfolioID: portfolio.portfolioID },
      attributes: ['symbol'],
      group: ['symbol'],
    });

    // Calculate net shares for each symbol
    const portfolioDetails = await Promise.all(
      symbols.map(async (transaction) => {
        const symbol = transaction.symbol;
        const totalSharesOwned = await this.calculateTotalShares(
          symbol,
          portfolio.portfolioID,
        );

        // Optionally, include the current price of each share from the Shares table
        const share = await this.shareRepository.findOne({ where: { symbol } });

        return {
          symbol,
          quantity: totalSharesOwned,
          currentPrice: share?.currentPrice || null,
          // Add any other details you want to include for each share
        };
      }),
    );

    return portfolioDetails;
  }

  async calculateTotalShares(
    symbol: string,
    portfolioID: number,
  ): Promise<number> {
    const buyTransactions = await this.transactionRepository.findAll({
      where: { portfolioID, symbol, type: 'BUY' },
      attributes: ['quantity'],
    });

    const sellTransactions = await this.transactionRepository.findAll({
      where: { portfolioID, symbol, type: 'SELL' },
      attributes: ['quantity'],
    });

    const totalBought = buyTransactions.reduce(
      (sum, transaction) => sum + transaction.quantity,
      0,
    );
    const totalSold = sellTransactions.reduce(
      (sum, transaction) => sum + transaction.quantity,
      0,
    );

    return totalBought - totalSold;
  }
}
