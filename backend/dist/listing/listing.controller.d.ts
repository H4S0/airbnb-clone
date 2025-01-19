import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    createListing(createListingDto: ListingSchemaType): Promise<{
        category: string;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        beds: number;
        description: string;
        listingName: string;
        bedRoom: number;
        wc: number;
        livingRoom: number;
        price: number;
        userId: number;
        id: number;
        createdAt: Date;
        Amenities: string[];
        updatedAt: Date;
    }>;
    getAllListings(): Promise<{
        category: string;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        beds: number;
        description: string;
        listingName: string;
        bedRoom: number;
        wc: number;
        livingRoom: number;
        price: number;
        userId: number;
        id: number;
        createdAt: Date;
        Amenities: string[];
        updatedAt: Date;
    }[]>;
    getListingByID(id: number): Promise<{
        category: string;
        country: string;
        city: string;
        address: string;
        postalNumber: number;
        beds: number;
        description: string;
        listingName: string;
        bedRoom: number;
        wc: number;
        livingRoom: number;
        price: number;
        Amenities: string[];
    }>;
}
