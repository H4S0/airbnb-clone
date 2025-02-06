import { PrismaService } from 'src/prismaService/prisma.service';
import { ApplicationSchemaType } from 'src/shared/libs/zodSchema';
export declare class ApplicationService {
    private prisma;
    constructor(prisma: PrismaService);
    createApplication(data: ApplicationSchemaType): Promise<{
        id: number;
        fullName: string;
        email: string;
        phoneNumber: string;
        dateRange: import("@prisma/client/runtime/library").JsonValue;
        adults: number;
        kids: number;
        listingId: number;
        userId: number;
        isAccepted: boolean;
        isDeclined: boolean;
    }>;
    updateApplication(id: number, createApplicationDto: {
        isAccepted: boolean;
        isDeclined: boolean;
    }): Promise<{
        id: number;
        fullName: string;
        email: string;
        phoneNumber: string;
        dateRange: import("@prisma/client/runtime/library").JsonValue;
        adults: number;
        kids: number;
        listingId: number;
        userId: number;
        isAccepted: boolean;
        isDeclined: boolean;
    }>;
}
