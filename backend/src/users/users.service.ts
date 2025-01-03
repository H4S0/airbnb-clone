import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(email: string, password: string): Promise<User> {
    const existing = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existing) {
      throw new ConflictException('email already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
