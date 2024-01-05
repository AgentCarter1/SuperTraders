import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ShareService } from './share.service';
import { shareProviders } from './share.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ShareController],
  providers: [ShareService, ...shareProviders],
  exports: [ShareService, ...shareProviders],
})
export class ShareModule {}
