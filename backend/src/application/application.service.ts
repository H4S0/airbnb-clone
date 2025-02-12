import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prismaService/prisma.service';
import { ApplicationSchemaType } from 'src/shared/libs/zodSchema';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async createApplication(data: ApplicationSchemaType) {
    const {
      fullName,
      email,
      phoneNumber,
      dateRange,
      adults,
      kids,
      userId,
      listingId,
    } = data;

    return this.prisma.application.create({
      data: {
        fullName,
        email,
        phoneNumber,
        dateRange,
        adults,
        kids,
        user: { connect: { id: userId } },
        Listing: { connect: { id: listingId } },
      },
    });
  }

  async updateApplication(
    id: number,
    createApplicationDto: ApplicationSchemaType
  ) {
    return this.prisma.application.update({
      where: { id: Number(id) },
      data: createApplicationDto,
    });
  }

  async deleteApplicationOnDecline(id: number) {
    return this.prisma.application.delete({
      where: { id: Number(id) },
    });
  }
}
