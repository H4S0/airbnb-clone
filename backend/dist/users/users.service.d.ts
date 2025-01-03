import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUser(email: string): Promise<User>;
    createUser(email: string, password: string): Promise<User>;
}
