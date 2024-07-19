// sns.provider.ts
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

export const AWS_SNS_PROVIDER = Symbol('SNS');

export const SnsProvider = {
  provide: AWS_SNS_PROVIDER,
  useFactory: (configService: ConfigService) => {
    return new AWS.SNS({
      endpoint: configService.get<string>('SNS_ENDPOINT'),
      region: configService.get<string>('AWS_REGION'),
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  },
  inject: [ConfigService],
};
