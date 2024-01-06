import { IsString, IsEmail, IsArray } from 'class-validator';
import { PortfolioDto } from './user-portfolio.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @IsArray()
  portfolios: PortfolioDto[];
}
