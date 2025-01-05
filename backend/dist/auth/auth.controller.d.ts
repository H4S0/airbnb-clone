import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    register(body: {
        email: string;
        password: string;
        confirmPassword: string;
    }): Promise<{
        user: {
            email: string;
            password: string;
            id: number;
            createdAt: Date;
        };
        token: {
            accessToken: string;
            email: string;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        email: string;
    }>;
    getCurrentUser(req: any): any;
}
