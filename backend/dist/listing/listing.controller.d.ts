import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    createListing(createListingDto: ListingSchemaType): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
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
    }>;
}
