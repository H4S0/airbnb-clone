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
        dateRange: import("@prisma/client/runtime/library").JsonValue;
        adults: number;
        kids: number;
        listingId: number;
        isAccepted: boolean;
        isDeclined: boolean;
        id: number;
    }>;
    updateApplication(id: number, createApplicationDto: {
        isAccepted: boolean;
        isDeclined: boolean;
    }): Promise<{
        email: string;
        userId: number;
        fullName: string;
        phoneNumber: string;
        dateRange: import("@prisma/client/runtime/library").JsonValue;
        adults: number;
        kids: number;
        listingId: number;
        isAccepted: boolean;
        isDeclined: boolean;
        id: number;
    }>;
}
