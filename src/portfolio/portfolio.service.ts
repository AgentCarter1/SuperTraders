import { Injectable, Inject } from '@nestjs/common';
import { Portfolio } from './model/portfolio.model'; // Varsayılan modelinizi kullanarak bu importı düzenleyin

@Injectable()
export class PortfolioService {
  constructor(
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository: typeof Portfolio,
  ) {}
}
