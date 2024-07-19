import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Route } from '../../enums/route';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';

@Controller(Route.Auth.BASE)
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Access token generated', type: SignInResponseDto })
  @Post(Route.Auth.SIGN_IN)
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}
