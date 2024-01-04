import { IsString, IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreatePortfolioDetailDto {
  @IsNotEmpty()
  @IsInt()
  portfolioID: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  symbol: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;
}
