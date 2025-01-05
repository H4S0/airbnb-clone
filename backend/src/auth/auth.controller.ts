import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guards';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; confirmPassword: string }
  ) {
    const { email, password, confirmPassword } = body;

    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    const newUser = await this.usersService.createUser(email, password);

    const token = await this.authService.login(email, password);

    return {
      user: newUser,
      token,
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.authService.findOne({ id: data['id'] });

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
