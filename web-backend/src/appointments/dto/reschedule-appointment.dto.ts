import { IsNotEmpty, IsString } from 'class-validator';

export class RescheduleAppointmentDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}
