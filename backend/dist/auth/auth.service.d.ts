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
        createdAt: Date;
        id: number;
    }>;
    login(email: string, password: string): Promise<{
        message: string;
    }>;
    findOne(condidition: any): Promise<User>;
    validateUser(email: string, password: string): Promise<User>;
}
