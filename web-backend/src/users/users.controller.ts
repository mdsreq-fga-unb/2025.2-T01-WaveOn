import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users/register')
  async registerUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto, 'USER');
  }

  // Em produção: proteger com guard de ADMIN
  @Post('admin/register')
  async registerAdmin(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto, 'ADMIN');
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  async getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/me')
  async updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/me/password')
  async changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.sub, dto);
  }

  // ========== ROTAS ADMIN ==========

  @Get('users/admin/all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('users/admin/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserByIdWithRelations(id);
  }
}
