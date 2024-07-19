import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

// Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export function IsPassword() {
  return applyDecorators(
    IsNotEmpty(),
    IsString(),
    Matches(PASSWORD_REGEX, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  );
}
