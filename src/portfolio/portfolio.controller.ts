import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDetail } from './interface/portfolio-detail.interface';
import { CreatePortfolioDto } from './dto/portfolio-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  // Injecting the PortfolioService into the controller via the constructor.
  constructor(private portfolioService: PortfolioService) {}

  @Post('create')
  async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
    try {
      return await this.portfolioService.createPortfolio(createPortfolioDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create portfolio',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':userId')
  async getPortfolio(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<PortfolioDetail[]> {
    try {
      // Using the PortfolioService to retrieve the user's portfolio details.
      return await this.portfolioService.getUserPortfolio(userId);
    } catch (error) {
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
