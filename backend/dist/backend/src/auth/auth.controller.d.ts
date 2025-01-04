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
            createdAt: Date;
            id: number;
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
}
