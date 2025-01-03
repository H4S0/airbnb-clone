import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private usersService;
    constructor(prisma: PrismaService, jwtService: JwtService, usersService: UsersService);
    register(email: string, password: string, confirmPassword: string): Promise<any>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    validateUser(email: string, password: string): Promise<any>;
}
