import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ConflictException, NotFoundException } from '@nestjs/common';

@Controller('users') // Set the base route for user management
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get user by email
  @Get(':email')
  async getUser(@Param('email') email: string): Promise<User> {
    try {
      const user = await this.usersService.getUser(email);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }
}
