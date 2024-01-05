import { Share } from './model/share.model';

export const shareProviders = [
  {
    provide: 'SHARE_REPOSITORY',
    useValue: Share,
  },
];
