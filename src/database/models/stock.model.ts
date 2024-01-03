import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Stock extends Model<Stock> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;
}
