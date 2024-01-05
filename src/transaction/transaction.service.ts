import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './model/transaction.model';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
  ) {}

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
