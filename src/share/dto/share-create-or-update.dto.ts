import { IsString, IsDecimal, Length, IsNotEmpty } from 'class-validator';

export class CreateOrUpdateShareDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  symbol: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  currentPrice: number;
}
