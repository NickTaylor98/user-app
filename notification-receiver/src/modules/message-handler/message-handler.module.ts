import { Module } from '@nestjs/common';
import { MessageHandlerService } from './message-handler.service';

@Module({
  providers: [MessageHandlerService],
  exports: [MessageHandlerService],
})
export class MessageHandlerModule {}
