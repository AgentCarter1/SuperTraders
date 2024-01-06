import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDecimal,
  Length,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class ShareCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  symbol: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  currentPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
