import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsPassword } from '../../../decorators/is-password.decorator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @IsPassword()
  @ApiProperty({ example: 'password' })
  password: string;
}

export class SignInResponseDto {
  @ApiProperty({ example: 'access_token', type: String })
  access_token: string;
}
