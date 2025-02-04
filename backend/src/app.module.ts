import { Module } from '@nestjs/common';
import { PrismaModule } from './prismaService/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListingModule } from './listing/listing.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ListingModule,
    ApplicationModule,
  ],
})
export class AppModule {}
