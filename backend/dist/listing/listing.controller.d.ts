import { ListingService } from './listing.service';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    createListing(createListingDto: any, images: Express.Multer.File[]): Promise<{
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
        Amenities: string[];
        description: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
