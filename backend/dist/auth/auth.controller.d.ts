import { AuthService } from './auth.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private userService;
    constructor(userService: AuthService);
    register(body: {
        email: string;
        password: string;
        confirmPassword: string;
    }): Promise<{
        email: string;
        password: string;
        id: number;
        createdAt: Date;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    getProfile(user: User): Promise<User>;
}
