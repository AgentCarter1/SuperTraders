import { Injectable, Inject } from '@nestjs/common';
import { Share } from './model/share.model';

@Injectable()
export class ShareService {
  constructor(
    @Inject('SHARE_REPOSITORY')
    private shareRepository: typeof Share,
  ) {}
}
