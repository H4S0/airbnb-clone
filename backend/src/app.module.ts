import { Module } from '@nestjs/common';
import { PrismaModule } from './prismaService/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
})
export class AppModule {}
