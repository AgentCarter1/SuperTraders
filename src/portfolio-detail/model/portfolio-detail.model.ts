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
export class PortfolioDetail extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  portfolioDetailsID: number;

  @ForeignKey(() => Portfolio)
  @Column(DataType.INTEGER)
  portfolioID: number;

  @ForeignKey(() => Share)
  @Column(DataType.STRING(3))
  symbol: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @BelongsTo(() => Share)
  share: Share;
}
