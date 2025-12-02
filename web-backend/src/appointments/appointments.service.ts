import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { addDays, isBefore, isAfter, isSameDay } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  private diffMinutes(a: string, b: string) {
    const [h1, m1] = a.split(':').map(Number);
    const [h2, m2] = b.split(':').map(Number);

    return Math.abs(h1 * 60 + m1 - (h2 * 60 + m2));
  }

  private validateDate(dateString: string, time?: string) {
    const date = parseISO(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minDate = today;
    const maxDate = addDays(today, 7);

    if (isBefore(date, minDate) || isAfter(date, maxDate)) {
      throw new BadRequestException('A data deve estar entre hoje e 7 dias.');
    }

    if (isSameDay(date, today) && time) {
      const [h, m] = time.split(':').map(Number);
      const now = new Date();
      const agendamento = new Date(date);
      agendamento.setHours(h, m, 0, 0);
      if (agendamento < now) {
        throw new BadRequestException(
          'Não é permitido agendar para um horário que já passou.',
        );
      }
    }
  }

  async create(userId: string, dto: CreateAppointmentDto) {
    const { serviceType, date, time, carId, addressId, vehicleCategory } = dto;

    this.validateDate(date, time);

    const car = await this.prisma.car.findUnique({ where: { id: carId } });
    if (!car || car.userId !== userId) {
      throw new BadRequestException('Carro inválido.');
    }

    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });
    if (!address || address.userId !== userId) {
      throw new BadRequestException('Endereço inválido.');
    }

    const pricing = await this.prisma.pricing.findFirst({
      where: {
        serviceType,
        vehicleCategory,
      },
    });

    if (!pricing) {
      throw new BadRequestException(
        'Preço não encontrado para essa categoria.',
      );
    }

    const existing = await this.prisma.appointment.findMany({
      where: {
        date: parseISO(date),
        status: 'SCHEDULED',
      },
    });

    for (const ap of existing) {
      if (this.diffMinutes(ap.time, time) < 240) {
        throw new BadRequestException(
          'Horário conflita com outro agendamento.',
        );
      }
    }

    return this.prisma.appointment.create({
      data: {
        serviceType,
        date: parseISO(date),
        time,
        priceCents: pricing.priceCents,
        userId,
        carId,
        addressId,
      },
    });
  }

  async getAvailableSlots(dateString: string) {
    const date = parseISO(dateString);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        date,
        status: 'SCHEDULED',
      },
      select: {
        time: true,
      },
    });

    const bookedSlots = appointments.map((ap) => ap.time);

    return { bookedSlots };
  }

  async getMyAppointments(userId: string) {
    return this.prisma.appointment.findMany({
      where: { userId },
      include: {
        car: true,
        address: true,
        payment: true,
      },
      orderBy: { date: 'asc' },
    });
  }

  async cancel(userId: string, id: string) {
    const ap = await this.prisma.appointment.findUnique({ where: { id } });

    if (!ap || ap.userId !== userId) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  async reschedule(userId: string, id: string, dto: RescheduleAppointmentDto) {
    const ap = await this.prisma.appointment.findUnique({ where: { id } });

    if (!ap || ap.userId !== userId) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    this.validateDate(dto.date, dto.time);

    const sameDay = await this.prisma.appointment.findMany({
      where: { date: parseISO(dto.date) },
    });

    for (const a of sameDay) {
      if (this.diffMinutes(a.time, dto.time) < 240) {
        throw new BadRequestException('Horário indisponível.');
      }
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        date: parseISO(dto.date),
        time: dto.time,
        status: 'SCHEDULED',
      },
    });
  }

  async repeat(userId: string, id: string) {
    const ap = await this.prisma.appointment.findUnique({ where: { id } });

    if (!ap || ap.userId !== userId) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    return {
      serviceType: ap.serviceType,
      vehicleCategory: (await this.prisma.car.findUnique({
        where: { id: ap.carId },
      }))!.category,
      carId: ap.carId,
      addressId: ap.addressId,
    };
  }

  // ========== MÉTODOS ADMIN ==========

  async getAllForAdmin() {
    return this.prisma.appointment.findMany({
      select: {
        id: true,
        date: true,
        time: true,
        priceCents: true,
        serviceType: true,
        observations: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        car: {
          select: {
            id: true,
            plate: true,
            category: true,
            brand: true,
            model: true,
          },
        },
        address: {
          select: {
            id: true,
            cep: true,
            street: true,
            number: true,
          },
        },
        payment: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async updateObservations(id: string, observations: string) {
    return this.prisma.appointment.update({
      where: { id },
      data: { observations },
    });
  }

  async complete(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (appointment.status !== 'SCHEDULED') {
      throw new BadRequestException(
        'Apenas agendamentos pendentes podem ser concluídos',
      );
    }

    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });
  }
}
