import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { DatabaseModule } from 'src/database/database.module';
import { shareProviders } from './share.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ShareController],
  providers: [...shareProviders],
  exports: [...shareProviders],
})
export class ShareModule {}
