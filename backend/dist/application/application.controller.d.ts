import { ApplicationSchemaType } from 'src/shared/libs/zodSchema';
import { ApplicationService } from './application.service';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    createApplication(createApplicationDto: ApplicationSchemaType, user: {
        userId: number;
        email: string;
    }): Promise<void>;
    updateStatus(id: number, createApplicationDto: {
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
