import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsAge } from '../../../decorators/is-age.decorator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'John Doe', required: false })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'example@example.com', required: false })
  email?: string;

  @IsAge()
  @IsOptional()
  @ApiProperty({ example: 25, required: false })
  age?: number;
}
