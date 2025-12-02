import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SlotsController],
  providers: [SlotsService, PrismaService],
})
export class SlotsModule {}
