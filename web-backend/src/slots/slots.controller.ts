import { Controller, Get, Param } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('api/available-slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Public()
  @Get(':date')
  async getAvailable(@Param('date') date: string) {
    return this.slotsService.getAvailableSlots(date);
  }
}
