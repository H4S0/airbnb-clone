import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post('create')
  async createListing(@Body() createListingDto: ListingSchemaType) {
    const newListing =
      await this.listingService.createListing(createListingDto);
    return newListing;
  }

  @Get('getAllListings')
  async getAllListings() {
    const allListings = this.listingService.getAllListings();
    return allListings;
  }
}
