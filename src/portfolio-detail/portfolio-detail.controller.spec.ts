import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioDetailController } from './portfolio-detail.controller';

describe('PortfolioDetailController', () => {
  let controller: PortfolioDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioDetailController],
    }).compile();

    controller = module.get<PortfolioDetailController>(
      PortfolioDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
