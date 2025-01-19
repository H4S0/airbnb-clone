import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async createListing(data: ListingSchemaType) {
    const {
      category,
      price,
      listingLocation: { country, city, address, postalNumber },
      listingDetails: {
        name,
        description,
        beds,
        bedRoom,
        livingRoom,
        wc,
        amenities,
      },
    } = data;
    return this.prisma.listing.create({
      data: {
        category,
        country,
        city,
        address,
        postalNumber,
        price,
        listingName: name,
        description,
        beds,
        bedRoom,
        livingRoom,
        wc,
        Amenities: amenities,
        user: {
          connect: {
            id: data.userId, // Replace with actual user ID logic
          },
        },
      },
    });
  }

  async getAllListings() {
    return this.prisma.listing.findMany();
  }

  async getListingByID(id: number) {
    return this.prisma.listing.findUnique({
      where: {
        id: id,
      },
      select: {
        listingName: true,
        description: true,
        country: true,
        city: true,
        address: true,
        postalNumber: true,
        wc: true,
        livingRoom: true,
        bedRoom: true,
        beds: true,
        Amenities: true,
        category: true,
        price: true,
      },
    });
  }

  async updateListing(id: number, data: ListingSchemaType) {
    return this.prisma.listing.update({
      where: { id },
      data,
    });
  }

  async deleteListing(id: number) {
    return this.prisma.listing.delete({
      where: { id },
    });
  }
}
