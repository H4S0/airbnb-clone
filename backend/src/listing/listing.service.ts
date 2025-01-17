import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async createListing(data: CreateListingDto) {
    return this.prisma.listing.create({
      data,
    });
  }

  async getAllListings() {
    return this.prisma.listing.findMany();
  }

  async updateListing(id: string, data: CreateListingDto) {
    return this.prisma.listing.update({
      where: { id },
      data,
    });
  }

  async deleteListing(id: string) {
    return this.prisma.listing.delete({
      where: { id },
    });
  }
}
