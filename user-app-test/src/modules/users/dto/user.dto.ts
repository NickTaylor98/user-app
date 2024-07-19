import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1, type: Number })
  id: number;

  @ApiProperty({ example: 'John Doe', type: String })
  name: string;

  @ApiProperty({ example: 'example@example.com', type: String })
  email: string;

  @ApiProperty({ example: 25, type: Number })
  age: number;
}
