import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Portfolio } from './model/portfolio.model';
import { Transaction } from 'src/transaction/model/transaction.model';
import { Share } from 'src/share/model/share.model';
import { PortfolioDetail } from './interface/portfolio-detail.interface';
import { CreatePortfolioDto } from './dto/portfolio-create.dto';

@Injectable()
export class PortfolioService {
  // Injecting the required repositories into the service constructor.
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository: typeof Portfolio,
    @Inject('SHARE_REPOSITORY')
    private shareRepository: typeof Share,
  ) {}

  public async createPortfolio(
    createPortfolioDto: CreatePortfolioDto,
  ): Promise<Portfolio> {
    const newPortfolio = new Portfolio({
      userID: createPortfolioDto.userID,
      balance: createPortfolioDto.balance,
    });

    try {
      return await newPortfolio.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create portfolio',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Public method to get the portfolio details for a user by their user ID.
  public async getUserPortfolio(userId: number): Promise<PortfolioDetail[]> {
    // Retrieving the portfolio for the given user ID.
    const portfolio = await this.getPortfolioByUserId(userId);
    // Getting all unique symbols for the transactions related to the portfolio.
    const symbols = await this.getDistinctSymbolsForPortfolio(
      portfolio.portfolioID,
    );

    // Calculating the portfolio details for each symbol and using Promise.all to handle them in parallel.
    const portfolioDetails = await Promise.all(
      symbols.map((symbol) =>
        this.getPortfolioDetailForSymbol(symbol, portfolio.portfolioID),
      ),
    );

    return portfolioDetails;
  }

  // Private method to retrieve the portfolio object by a user ID.
  private async getPortfolioByUserId(userId: number): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userID: userId },
    });
    // Throwing an exception if the portfolio is not found.
    if (!portfolio) {
      throw new HttpException('Portfolio not registered', HttpStatus.NOT_FOUND);
    }
    return portfolio;
  }

  // Private method to get all distinct symbols from the transactions of a portfolio.
  private async getDistinctSymbolsForPortfolio(
    portfolioID: number,
  ): Promise<string[]> {
    const transactions = await this.transactionRepository.findAll({
      where: { portfolioID },
      attributes: ['symbol'],
      group: ['symbol'],
    });
    // Mapping the transactions to get an array of symbols.
    return transactions.map((t) => t.symbol);
  }

  // Private method to get the portfolio details for a given symbol in a portfolio.
  private async getPortfolioDetailForSymbol(
    symbol: string,
    portfolioID: number,
  ): Promise<PortfolioDetail> {
    // Calculating the total shares owned for the symbol.
    const totalSharesOwned = await this.calculateTotalShares(
      symbol,
      portfolioID,
    );
    // Optionally, getting the current price of the share from the Shares table.
    const share = await this.shareRepository.findOne({ where: { symbol } });

    // Returning the details of the portfolio for the symbol.
    return {
      symbol,
      quantity: totalSharesOwned,
      currentPrice: share?.currentPrice || null,
    };
  }

  // Private method to calculate the total shares of a symbol for a portfolio.
  private async calculateTotalShares(
    symbol: string,
    portfolioID: number,
  ): Promise<number> {
    // Calculating the total bought and sold quantities for the symbol in parallel.
    const [totalBought, totalSold] = await Promise.all([
      this.sumTransactionQuantities(portfolioID, symbol, 'BUY'),
      this.sumTransactionQuantities(portfolioID, symbol, 'SELL'),
    ]);
    // Returning the net shares owned.
    return totalBought - totalSold;
  }

  // Private method to sum up the quantities of transactions for a given type and symbol.
  private async sumTransactionQuantities(
    portfolioID: number,
    symbol: string,
    type: 'BUY' | 'SELL',
  ): Promise<number> {
    const transactions = await this.transactionRepository.findAll({
      where: { portfolioID, symbol, type },
      attributes: ['quantity'],
    });
    // Reducing the transactions to get the total quantity.
    return transactions.reduce(
      (sum, transaction) => sum + transaction.quantity,
      0,
    );
  }
}
