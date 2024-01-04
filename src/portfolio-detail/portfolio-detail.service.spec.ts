import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioDetailService } from './portfolio-detail.service';

describe('PortfolioDetailService', () => {
  let service: PortfolioDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioDetailService],
    }).compile();

    service = module.get<PortfolioDetailService>(PortfolioDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
