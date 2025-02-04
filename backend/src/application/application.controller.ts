import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { ApplicationSchemaType } from 'src/shared/libs/zodSchema';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createApplication(
    @Body() createApplicationDto: ApplicationSchemaType,
    @GetUser() user: { userId: number; email: string }
  ) {
    const { userId } = user;

    const newApplication = await this.applicationService.createApplication({
      ...createApplicationDto,
      userId,
    });

    return { message: 'Application created successfully', newApplication };
  }
}
