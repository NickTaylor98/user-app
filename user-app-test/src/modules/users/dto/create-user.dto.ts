import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsAge } from '../../../decorators/is-age.decorator';
import { IsPassword } from '../../../decorators/is-password.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @IsAge()
  @ApiProperty({ example: 25 })
  age: number;

  @IsPassword()
  @ApiProperty({ example: 'password' })
  password: string;
}
