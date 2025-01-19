import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createListing(
    @Body() createListingDto: ListingSchemaType,
    @GetUser() user: { userId: number; email: string }
  ) {
    const { userId } = user;

    const newListing = await this.listingService.createListing({
      ...createListingDto,
      userId,
    });
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
