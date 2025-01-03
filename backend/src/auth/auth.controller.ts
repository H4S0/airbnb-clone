import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller(`user`)
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; confirmPassword: string }
  ) {
    return this.userService.register(
      body.email,
      body.password,
      body.confirmPassword
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }

  @Get('profile')
  @UseGuards(jwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const user = req.user;
    return this.userService.validateUser(user['userId']);
  }
}
