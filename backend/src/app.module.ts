import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, UsersService],
})
export class AppModule {}
