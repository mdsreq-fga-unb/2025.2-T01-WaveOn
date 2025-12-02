import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  async getPrice(serviceType: string, category: string) {

    const pricing = await this.prisma.pricing.findFirst({
      where: {
        serviceType,
        vehicleCategory: category,
      },
    });

    if (!pricing) {
      throw new NotFoundException(
        `Não há preço configurado para ${serviceType} - ${category}`,
      );
    }

    const priceFormatted = (pricing.priceCents / 100)
      .toFixed(2)
      .replace('.', ',');

    return {
      price: priceFormatted,
      currency: 'BRL',
    };
  }

  async getAll() {
    return this.prisma.pricing.findMany({
      orderBy: [{ serviceType: 'asc' }, { vehicleCategory: 'asc' }],
    });
  }

  async update(id: number, priceCents: number) {
    const pricing = await this.prisma.pricing.findUnique({ where: { id } });

    if (!pricing) {
      throw new NotFoundException('Preço não encontrado');
    }

    return this.prisma.pricing.update({
      where: { id },
      data: { priceCents },
    });
  }
}
