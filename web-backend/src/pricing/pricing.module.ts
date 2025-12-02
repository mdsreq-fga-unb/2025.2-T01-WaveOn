import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PricingController],
  providers: [PricingService, PrismaService],
})
export class PricingModule {}
