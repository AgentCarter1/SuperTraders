import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Transaction } from 'src/transaction/model/transaction.model';
import { User } from 'src/user/model/user.model';

@Table
export class Portfolio extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  portfolioID: number;

  @Column(DataType.DECIMAL(10, 2))
  balance: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userID: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
