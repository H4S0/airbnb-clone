import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly usersService;
    private readonly authService;
    private jwtService;
    constructor(usersService: UsersService, authService: AuthService, jwtService: JwtService);
    register(body: {
        email: string;
        password: string;
        confirmPassword: string;
    }): Promise<{
        user: {
            id: number;
            email: string;
            password: string;
            createdAt: Date;
        };
        token: {
            accessToken: string;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    verify(user: any): any;
}
