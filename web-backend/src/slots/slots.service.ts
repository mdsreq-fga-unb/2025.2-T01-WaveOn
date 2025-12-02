import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addDays, isBefore, isSameDay, differenceInMinutes } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';


@Injectable()
export class SlotsService {
  constructor(private readonly prisma: PrismaService) {}

  // horários padrão
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

  private parseTime(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    return { hours, minutes };
  }

  private diffInMinutes(timeA: string, timeB: string) {
    const a = this.parseTime(timeA);
    const b = this.parseTime(timeB);
    return Math.abs((a.hours * 60 + a.minutes) - (b.hours * 60 + b.minutes));
  }

  async getAvailableSlots(dateString: string) {
    const date = parseISO(dateString);
    const today = new Date();

    const minDate = addDays(today, 1);
    const maxDate = addDays(today, 7);

    // 1. NÃO permitir hoje
    if (isSameDay(date, today)) {
      throw new BadRequestException('Não é permitido agendar para o dia de hoje.');
    }

    // 2. Intervalo permitido: 1 a 7 dias
    if (isBefore(date, minDate) || isBefore(maxDate, date)) {
      throw new BadRequestException('A data deve estar entre 1 e 7 dias a partir de hoje.');
    }

    // 3. Buscar todos os agendamentos desse dia
    const appointments = await this.prisma.appointment.findMany({
      where: { date },
    });

    const bookedTimes = appointments.map(a => a.time);

    let available = [...this.timeSlots];

    // 4. Regra do intervalo de 4 horas
    for (const booked of bookedTimes) {
      available = available.filter(slot => this.diffInMinutes(slot, booked) >= 240);
    }

    // 5. Remover horários já agendados
    available = available.filter(slot => !bookedTimes.includes(slot));

    return {
      date: dateString,
      availableSlots: available,
      bookedSlots: bookedTimes,
      rules: {
        minIntervalHours: 4,
        maxAdvanceDays: 7,
      },
    };
  }
}
