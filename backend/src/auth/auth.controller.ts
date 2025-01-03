import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service'; // Assuming AuthService handles JWT tokens
import { LocalAuthGuard } from './local-auth.guards';

@Controller('auth') // Define base route for authentication
export class AuthController {
  constructor(
    private readonly usersService: UsersService, // Injecting UsersService
    private readonly authService: AuthService // Injecting AuthService
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
}
