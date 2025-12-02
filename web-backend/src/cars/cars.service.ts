import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateCarDto) {
    // Placa deve ser única
    const existing = await this.prisma.car.findUnique({
      where: { plate: dto.plate },
    });

    if (existing) {
      throw new BadRequestException('Essa placa já está cadastrada.');
    }

    return this.prisma.car.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findMyCars(userId: string) {
    return this.prisma.car.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!car) throw new NotFoundException('Carro não encontrado');

    return car;
  }

  async update(userId: string, id: string, dto: UpdateCarDto) {
    const car = await this.findById(id);

    if (car.userId !== userId) {
      throw new BadRequestException('Você não tem permissão para alterar este carro');
    }

    return this.prisma.car.update({
      where: { id },
      data: dto,
    });
  }

  async delete(userId: string, id: string) {
    const car = await this.findById(id);

    if (car.userId !== userId) {
      throw new BadRequestException('Você não tem permissão para remover este carro');
    }

    return this.prisma.car.delete({
      where: { id },
    });
  }
}
