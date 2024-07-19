import { ConflictException } from '@nestjs/common';

export const toObject = (payload: any) => {
  try {
    const result = JSON.parse(payload);
    return result;
  } catch (error) {
    throw new ConflictException('Invalid JSON payload');
  }
};
