import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post('create')
  async createListing(@Body() createListingDto: ListingSchemaType) {
    console.log('Data received in backend:', createListingDto);
    const newListing =
      await this.listingService.createListing(createListingDto);
    return newListing;
  }

  @Get('getAllListings')
  async getAllListings() {
    const allListings = this.listingService.getAllListings();
    return allListings;
  }

  @Get(':id')
  async getListingByID(@Param('id', ParseIntPipe) id: number) {
    return this.listingService.getListingByID(id);
  }
}
