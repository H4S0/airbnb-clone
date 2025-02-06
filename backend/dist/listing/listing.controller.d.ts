import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    createListing(createListingDto: ListingSchemaType, user: {
        userId: number;
        email: string;
    }): Promise<{
        id: number;
        category: string;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        listingName: string;
        Amenities: string[];
        description: string;
        price: number;
        maxPerson: number;
        isPet: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    getListingByUser(user: {
        userId: number;
        email: string;
    }): Promise<{
        Application: {
            id: number;
            userId: number;
            email: string;
            fullName: string;
            phoneNumber: string;
            dateRange: import("@prisma/client/runtime/library").JsonValue;
            adults: number;
            kids: number;
            listingId: number;
        }[];
    }[]>;
    getAllListings(): Promise<{
        id: number;
        category: string;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        listingName: string;
        Amenities: string[];
        description: string;
        price: number;
        maxPerson: number;
        isPet: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }[]>;
    getListingByID(id: number): Promise<{
        category: string;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        listingName: string;
        Amenities: string[];
        description: string;
        price: number;
        maxPerson: number;
        isPet: boolean;
    }>;
    deleteListing(id: number): Promise<{
        id: number;
        category: string;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        beds: number;
        bedRoom: number;
        livingRoom: number;
        wc: number;
        listingName: string;
        Amenities: string[];
        description: string;
        price: number;
        maxPerson: number;
        isPet: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
