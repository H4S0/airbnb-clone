import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

@Module({
  controllers: [ApplicationController],
  providers: [PrismaService, ApplicationService],
})
export class ApplicationModule {}
