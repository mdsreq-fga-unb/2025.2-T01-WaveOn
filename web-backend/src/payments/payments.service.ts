import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { mp } from 'src/mercadopago.config';
import { Payment as MpPayment } from 'mercadopago';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}


  async createPixPayment(dto: { appointmentId: string; userId: string }) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: dto.appointmentId },
      include: {
        user: true, 
      },
    });

    if (!appointment) {
      throw new BadRequestException('Agendamento não encontrado');
    }

    const mpResponse = await new MpPayment(mp).create({
      body: {
        transaction_amount: appointment.priceCents / 100,
        description: `Pagamento do serviço ${appointment.serviceType}`,
        payment_method_id: 'pix',
        payer: { email: appointment.user.email }, 
      },
    });

    const trx = mpResponse;

    const payment = await this.prisma.payment.create({
      data: {
        type: 'PIX',
        status: 'PENDING',
        mercadoPagoId: trx.id ? trx.id.toString() : null,
        qrCode: trx.point_of_interaction?.transaction_data?.qr_code || null,
        qrCodeBase64:
          trx.point_of_interaction?.transaction_data?.qr_code_base64 || null,
        valueCents: appointment.priceCents,
        appointmentId: appointment.id,
        userId: dto.userId,
      },
    });

    return {
      paymentId: payment.id,
      qrCode: payment.qrCode,
      qrCodeBase64: payment.qrCodeBase64,
    };
  }

  async createCardPayment(dto: {
    appointmentId: string;
    userId: string;
    token: string;
    installment: number;
  }) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: dto.appointmentId },
    });

    if (!appointment) {
      throw new BadRequestException('Agendamento não encontrado');
    }


    const mpResponse = {
      id: 'MOCK_PAYMENT_ID_' + Math.random().toString(36).substring(2),
      status: 'approved',
    };

    const status = 'APPROVED';


    await this.prisma.payment.create({
      data: {
        type: 'CARD',
        status,
        mercadoPagoId: mpResponse.id,
        valueCents: appointment.priceCents,
        appointmentId: appointment.id,
        userId: dto.userId,
      },
    });



    return {
      status,
      mercadoPagoId: mpResponse.id,
      mock: true,
      message: 'Pagamento mockado aprovado com sucesso',
    };
  }


  async handleWebhook(req: any) {
    const body = req.body;

    if (body.type !== 'payment') return { received: true };

    const mpPayment = await new MpPayment(mp).get({
      id: body.data.id,
    });

    const status =
      mpPayment.status === 'approved'
        ? 'APPROVED'
        : mpPayment.status === 'rejected'
          ? 'REJECTED'
          : 'PENDING';

    await this.prisma.payment.updateMany({
      where: { mercadoPagoId: mpPayment.id?.toString() },
      data: { status },
    });

    if (status === 'APPROVED') {
      const payment = await this.prisma.payment.findFirst({
        where: { mercadoPagoId: mpPayment.id?.toString() },
      });

      if (payment) {
    
        await this.prisma.appointment.update({
          where: { id: payment.appointmentId },
          data: { status: 'SCHEDULED' },
        });
      }
    }

    return { success: true };
  }


  async getPayment(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }
}
