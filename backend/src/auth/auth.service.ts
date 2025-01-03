import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prismaService/prisma.service';
import { loginSchema, registerSchema } from '../../../shared/libs/zodSchema';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async register(email: string, password: string, confirmPassword: string) {
    const result = registerSchema.safeParse({
      email,
      password,
      confirmPassword,
    });
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return user;
  }

  async login(email: string, password: string) {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });
    return { accessToken: token };
  }

  async validateUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
