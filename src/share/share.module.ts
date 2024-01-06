import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { DatabaseModule } from 'src/database/database.module';
import { shareProviders } from './share.providers';
import { ShareService } from './share.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ShareController],
  providers: [ShareService, ...shareProviders],
  exports: [ShareService, ...shareProviders],
})
export class ShareModule {}
