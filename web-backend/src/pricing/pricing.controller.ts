import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Public()
  @Get(':serviceType/:category')
  async getPrice(
    @Param('serviceType') serviceType: string,
    @Param('category') category: string,
  ) {
    return this.pricingService.getPrice(serviceType, category);
  }

  @Public()
  @Get()
  async getAll() {
    return this.pricingService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { priceCents: number }) {
    return this.pricingService.update(Number(id), body.priceCents);
  }
}
