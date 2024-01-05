import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Transaction } from 'src/transaction/model/transaction.model';

@Table
export class Share extends Model {
  @PrimaryKey
  @Column(DataType.STRING(3))
  symbol: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DECIMAL(5, 2))
  currentPrice: number;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
