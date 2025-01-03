import { UsersService } from './users.service';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(email: string): Promise<User>;
}
