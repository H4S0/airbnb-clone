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
        id: number;
        createdAt: Date;
        listingName: string;
        Amenities: string[];
        updatedAt: Date;
    }>;
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
        listingName: string;
        Amenities: string[];
    }>;
}
