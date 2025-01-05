import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
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
            email: string;
            password: string;
            createdAt: Date;
            id: number;
        };
        token: {
            message: string;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<{
        email: string;
        createdAt: Date;
        id: number;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
