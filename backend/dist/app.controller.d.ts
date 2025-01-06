import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: AuthService);
    getHello(): string;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accesToken: string;
    }>;
}
