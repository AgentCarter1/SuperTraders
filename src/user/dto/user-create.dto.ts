import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  portfolios: PortfolioDto[];
}

export class PortfolioDto {
  @IsString()
  name: string;
}
