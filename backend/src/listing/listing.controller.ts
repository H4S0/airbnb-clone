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

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4))
  async createListing(
    @Body createListingDto: any,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    try {
      const imagesBuffers = images.map((file) => file.buffer);
      const newListing = await this.listingService.createListing({
        ...createListingDto,
        listingImage: imagesBuffers,
      });
      return newListing;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
