import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { FilesInterceptor } from '@nestjs/platform-express';
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
}
