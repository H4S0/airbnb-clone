import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { ListingSchemaType } from 'src/shared/libs/zodSchema';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async createListing(data: ListingSchemaType) {
    return this.prisma.listing.create({
      data: {
        category: data.category,
        country: data.country,
        city: data.city,
        address: data.address,
        postalNumber: data.postalNumber,
        beds: data.beds,
        bedRoom: data.bedRoom,
        livingRoom: data.livingRoom,
        wc: data.wc,
        listingName: data.listingName,
        Amenities: data.selectedAmenities,
        description: data.description,
        price: data.price,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  async getAllListings() {
    return this.prisma.listing.findMany();
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
