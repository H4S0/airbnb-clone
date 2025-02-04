import { PrismaService } from 'src/prismaService/prisma.service';
import { ApplicationSchemaType } from 'src/shared/libs/zodSchema';
export declare class ApplicationService {
    private prisma;
    constructor(prisma: PrismaService);
    createApplication(data: ApplicationSchemaType): Promise<{
        email: string;
        userId: number;
        fullName: string;
        phoneNumber: string;
        dateRange: string;
        adults: number;
        kids: number;
        listingId: number;
        id: number;
    }>;
}
