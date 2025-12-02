import { Controller, Post, Get, Body, Param, Req, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller("api/payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("pix")
  createPix(@Body() dto: any) {
    return this.paymentsService.createPixPayment(dto);
  }

  @Post("card")
  createCard(@Body() dto: any) {
    return this.paymentsService.createCardPayment(dto);
  }

  @Post("webhook")
  @HttpCode(200)
  webhook(@Req() req: any) {
    return this.paymentsService.handleWebhook(req);
  }

  @Get(":id")
  getPayment(@Param("id") id: string) {
    return this.paymentsService.getPayment(id);
  }
}