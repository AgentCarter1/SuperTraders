import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePortfolioDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  userID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  balance: number;
}
