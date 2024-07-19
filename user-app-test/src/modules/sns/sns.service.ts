import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { AWS_SNS_PROVIDER } from './sns.provider';

@Injectable()
export class SnsService {
  private readonly logger = new Logger(SnsService.name);
  constructor(
    @Inject(AWS_SNS_PROVIDER) private readonly sns: AWS.SNS,
    private readonly configService: ConfigService,
  ) {}

  async publishMessage(event: string, payload: object): Promise<AWS.SNS.PublishResponse> {
    const params: AWS.SNS.PublishInput = {
      TopicArn: this.configService.get('SNS_USER_TOPIC_ARN'),
      Message: JSON.stringify({ event, payload }),
    };

    try {
      const result = await this.sns.publish(params).promise();
      return result;
    } catch (error) {
      this.logger.error(`Error publishing message to SNS: ${error.message}`);
      throw error;
    }
  }
}
