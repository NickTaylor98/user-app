import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Queue } from '../../enums/queue';
import { toObject } from '../../helpers/json.helper';

@Injectable()
export class MessageHandlerService {
  private readonly logger = new Logger(MessageHandlerService.name);

  @SqsMessageHandler(Queue.UserEvent, false)
  public async handleMessage(message: Message) {
    const { Body } = message;

    const payload = toObject(Body);

    const payloadMessage = toObject(payload.Message);

    const { event, payload: userData } = payloadMessage;

    if (!event || !userData) {
      this.logger.error('Invalid payload:', payload);
      return;
    }

    this.logger.log({ event, userData });
  }
}
