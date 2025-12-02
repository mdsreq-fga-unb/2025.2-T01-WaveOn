import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';

@Controller('api/appointments')
export class AppointmentsController {
  constructor(private readonly apService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() dto: CreateAppointmentDto) {
    return this.apService.create(req.user.sub, dto);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMine(@Req() req: any) {
    return this.apService.getMyAppointments(req.user.sub);
  }

  @Get('available-slots')
  getAvailableSlots(@Query('date') date: string) {
    return this.apService.getAvailableSlots(date);
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  cancel(@Req() req: any, @Param('id') id: string) {
    return this.apService.cancel(req.user.sub, id);
  }

  @Patch(':id/reschedule')
  @UseGuards(JwtAuthGuard)
  reschedule(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: RescheduleAppointmentDto,
  ) {
    return this.apService.reschedule(req.user.sub, id, dto);
  }

  @Get(':id/repeat')
  @UseGuards(JwtAuthGuard)
  repeat(@Req() req: any, @Param('id') id: string) {
    return this.apService.repeat(req.user.sub, id);
  }

  // ========== ROTAS ADMIN ==========

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getAllForAdmin() {
    return this.apService.getAllForAdmin();
  }

  @Patch(':id/observations')
  @UseGuards(JwtAuthGuard, AdminGuard) // ← Adicionar JwtAuthGuard antes do AdminGuard
  async updateObservations(
    @Param('id') id: string,
    @Body() body: { observations: string },
  ) {
    return this.apService.updateObservations(id, body.observations);
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async completeAppointment(@Param('id') id: string) {
    return this.apService.complete(id);
  }

  // ========== ROTAS DE COMPATIBILIDADE (FRONTEND ANTIGO) ==========

  @Post('/finalizarAgendamento')
  @UseGuards(JwtAuthGuard)
  async finalizarAgendamento(
    @Req() req: any,
    @Body() dto: CreateAppointmentDto,
  ) {
    return this.apService.create(req.user.sub, dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Req() req: any, @Param('id') id: string) {
    const appointments = await this.apService.getMyAppointments(req.user.sub);
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) {
      throw new Error('Agendamento não encontrado');
    }
    return appointment;
  }
}
