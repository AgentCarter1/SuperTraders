import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Portfolio } from 'src/portfolio/model/portfolio.model';
import { Share } from 'src/share/model/share.model';

@Table
export class Transaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  transactionID: number;

  @ForeignKey(() => Portfolio)
  @Column(DataType.INTEGER)
  portfolioID: number;

  @ForeignKey(() => Share)
  @Column(DataType.STRING(3))
  symbol: string;

  @Column(DataType.STRING(4))
  type: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.DECIMAL(5, 2))
  price: number;

  @Column(DataType.DATE)
  dateTime: Date;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @BelongsTo(() => Share)
  share: Share;
}
