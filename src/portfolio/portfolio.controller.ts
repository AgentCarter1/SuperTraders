import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get(':userId')
  async getPortfolio(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return await this.portfolioService.getUserPortfolio(userId);
    } catch (error) {
      // Hata yönetimi: Kullanıcı portföyü bulunamazsa veya başka bir hata oluşursa
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
