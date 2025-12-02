import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/cars')
@UseGuards(JwtAuthGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateCarDto) {
    return this.carsService.create(req.user.sub, dto);
  }

  @Get('my')
  async getMyCars(@Req() req: any) {
    return this.carsService.findMyCars(req.user.sub);
  }

  @Patch(':id')
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateCarDto,
  ) {
    return this.carsService.update(req.user.sub, id, dto);
  }

  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string) {
    return this.carsService.delete(req.user.sub, id);
  }
}
