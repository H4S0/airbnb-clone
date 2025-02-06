import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    createListing(createListingDto: ListingSchemaType, user: {
        userId: number;
        email: string;
    }): Promise<{
        userId: number;
        category: string;
        price: number;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        description: string;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        maxPerson: number;
        isPet: boolean;
        id: number;
        createdAt: Date;
        listingName: string;
        Amenities: string[];
        updatedAt: Date;
    }>;
    getListingByUser(user: {
        userId: number;
        email: string;
    }): Promise<{
        Application: {
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
        }[];
    }[]>;
    getAllListings(): Promise<{
        userId: number;
        category: string;
        price: number;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        description: string;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        maxPerson: number;
        isPet: boolean;
        id: number;
        createdAt: Date;
        listingName: string;
        Amenities: string[];
        updatedAt: Date;
    }[]>;
    getListingByID(id: number): Promise<{
        category: string;
        price: number;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        description: string;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        maxPerson: number;
        isPet: boolean;
        listingName: string;
        Amenities: string[];
    }>;
    deleteListing(id: number): Promise<{
        userId: number;
        category: string;
        price: number;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        description: string;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        maxPerson: number;
        isPet: boolean;
        id: number;
        createdAt: Date;
        listingName: string;
        Amenities: string[];
        updatedAt: Date;
    }>;
}
