import { SQSClient } from '@aws-sdk/client-sqs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { Queue } from './enums/queue';
import { MessageHandlerService } from './modules/message-handler/message-handler.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [
            {
              name: Queue.UserEvent,
              queueUrl: configService.get('SQS_QUEUE_URL'),
              region: configService.get('AWS_REGION'),
              terminateGracefully: true,
              sqs: new SQSClient({
                region: configService.get<string>('AWS_REGION'),
                endpoint: configService.get<string>('SQS_ENDPOINT'),
                credentials: {
                  accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
                  secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
                },
              }),
            },
          ],
          producers: [],
        };
      },
    }),
  ],
  providers: [MessageHandlerService],
})
export class AppModule {}
