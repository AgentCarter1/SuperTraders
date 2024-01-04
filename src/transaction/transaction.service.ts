import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  async buyShare() {
    return 'buy';
  }

  async sellShare() {
    return 'sell';
  }
}
