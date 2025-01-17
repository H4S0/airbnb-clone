import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    createListing(createListingDto: ListingSchemaType): Promise<{
        id: string;
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
}
