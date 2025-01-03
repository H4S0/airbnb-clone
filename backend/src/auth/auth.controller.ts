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

    // Validate password confirmation
    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    // Create the user via UsersService
    const newUser = await this.usersService.createUser(email, password);

    // You can optionally generate a JWT token right after registration if needed
    const token = await this.authService.login(email, password); // Assuming login() method generates a token

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
