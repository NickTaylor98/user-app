import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Route } from '../../enums/route';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto, FindAllUsersResponseDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('User API')
@UseGuards(AuthGuard)
@Controller(Route.Users.BASE)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(Route.Users.CREATE)
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'User created', type: UserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get(Route.Users.FIND_ALL)
  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users found', type: FindAllUsersResponseDto })
  async findAll(@Query() query: FindAllUsersDto): Promise<FindAllUsersResponseDto> {
    const [users, total] = await this.usersService.findAll(query);

    return {
      items: users,
      limit: query.limit,
      offset: query.offset,
      total,
    };
  }

  @Get(Route.Users.FIND_ONE)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User found', type: UserDto })
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.findOne(+id);
  }

  @Patch(Route.Users.UPDATE)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated', type: UserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(Route.Users.REMOVE)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(+id);
  }
}
