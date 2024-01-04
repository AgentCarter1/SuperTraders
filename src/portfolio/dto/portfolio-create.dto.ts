import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePortfolioDto {
  @IsNotEmpty()
  @IsInt()
  userID: number;
}
