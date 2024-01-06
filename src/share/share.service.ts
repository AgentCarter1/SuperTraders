import { Injectable, Inject } from '@nestjs/common';
import { Share } from './model/share.model';
import { ShareCreateDto } from './dto/share-create.dto';

@Injectable()
export class ShareService {
  constructor(
    @Inject('SHARE_REPOSITORY')
    private shareRepository: typeof Share,
  ) {}

  // Function to create a new share
  public async createShare(share: ShareCreateDto): Promise<Share> {
    const { symbol, name, currentPrice, quantity } = share;
    // Create a new Share instance using the Share model
    return this.shareRepository.create<Share>({
      symbol,
      name,
      currentPrice,
      quantity,
    });
  }

  // Return All Shares
  public async findAllShares(): Promise<Share[]> {
    return this.shareRepository.findAll<Share>();
  }
}
