import { Transaction } from './model/transaction.model';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useValue: Transaction,
  },
];
