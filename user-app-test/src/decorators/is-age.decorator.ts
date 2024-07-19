import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export function IsAge() {
  return applyDecorators(
    IsNotEmpty(),
    IsNumber(),
    Min(18, { message: 'User must be at least 18 years old' }),
    Max(100, { message: 'User must be less than 100 years old' }),
  );
}
