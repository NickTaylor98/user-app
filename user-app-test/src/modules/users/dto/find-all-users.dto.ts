import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class FindAllUsersDto {
  @IsIn(['name', 'age', 'id', 'email']) // available fields to sort by
  @IsOptional()
  @ApiProperty({ example: 'name', required: false })
  sortBy?: string = 'id';

  @IsIn(['DESC', 'ASC'])
  @IsOptional()
  @ApiProperty({ example: 'ASC', required: false })
  sortOrder?: string = 'ASC';

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ example: 0, required: false })
  offset: number = 0;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 20, required: false })
  @Type(() => Number)
  limit: number = 20;
}

export class FindAllUsersResponseDto {
  @ApiProperty({ type: [UserDto] })
  items: UserDto[];

  @ApiProperty({ example: 20, type: Number })
  limit: number;

  @ApiProperty({ example: 0, type: Number })
  offset: number;

  @ApiProperty({ example: 100, type: Number })
  total: number;
}
