import { Portfolio } from './model/portfolio.model';
export const portfolioProviders = [
  {
    provide: 'PORTFOLIO_REPOSITORY',
    useValue: Portfolio,
  },
];
