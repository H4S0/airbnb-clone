import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prismaService/prisma.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private prisma;
    private jwtService;
    private usersService;
    constructor(prisma: PrismaService, jwtService: JwtService, usersService: UsersService);
    register(email: string, password: string, confirmPassword: string): Promise<{
        email: string;
        password: string;
        id: number;
        createdAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    validateUser(email: string, password: string): Promise<User>;
}
