import {
  IsInt,
  IsString,
  IsDecimal,
  IsDate,
  IsNotEmpty,
  Min,
  Length,
  IsIn,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsInt()
  portfolioID: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  symbol: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['BUY', 'SELL'])
  type: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsNotEmpty()
  @IsDate()
  dateTime: Date;
}
