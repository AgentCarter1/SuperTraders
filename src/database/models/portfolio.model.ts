import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Stock } from './stock.model';

@Table
export class Portfolio extends Model<Portfolio> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Stock)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stockId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
