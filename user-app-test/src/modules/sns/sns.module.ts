import { Module } from '@nestjs/common';
import { SnsProvider } from './sns.provider';
import { SnsService } from './sns.service';

@Module({
  providers: [SnsProvider, SnsService],
  exports: [SnsService],
})
export class SnsModule {}
