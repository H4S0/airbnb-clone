import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
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
    const { listingId } = createApplicationDto;
    const newApplication = await this.applicationService.createApplication({
      ...createApplicationDto,
      userId,
      listingId,
    });

    console.log(listingId);

    return console.log('uspjesno');
  }

  @Patch(':id/update')
  async updateStatus(
    @Param('id') id: number,
    @Body() createApplicationDto: { isAccepted: boolean; isDeclined: boolean }
  ) {
    console.log('Received update:', { id, createApplicationDto }); // Debugging
    return this.applicationService.updateApplication(id, createApplicationDto);
  }
}
