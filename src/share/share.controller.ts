import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareCreateDto } from './dto/share-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shares')
@Controller('shares')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('create')
  async create(@Body() createShareDto: ShareCreateDto) {
    try {
      return await this.shareService.createShare(createShareDto);
    } catch (error) {
      throw new HttpException('Failed to create share', HttpStatus.BAD_REQUEST);
    }
  }
  @Get('get-all')
  async findAll() {
    return this.shareService.findAllShares();
  }
}
