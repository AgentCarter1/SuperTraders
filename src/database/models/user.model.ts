import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Portfolio } from './portfolio.model';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];
}
