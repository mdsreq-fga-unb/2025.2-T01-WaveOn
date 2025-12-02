import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import axios from 'axios';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  // Busca dados no ViaCEP
  private async fetchViaCep(cep: string) {
    const cleanedCep = cep.replace(/\D/g, '');

    if (cleanedCep.length !== 8) return null;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);

      if (response.data.erro) return null;

      return {
        street: response.data.logradouro,
        district: response.data.bairro,
        city: response.data.localidade,
      };
    } catch {
      return null;
    }
  }

  async create(userId: string, dto: CreateAddressDto) {
    let street = dto.street;
    let district = dto.district;
    let city = dto.city;

    // Se veio só o CEP → busca automática
    if (!street || !district || !city) {
      const viaCepData = await this.fetchViaCep(dto.cep);
      if (viaCepData) {
        street ??= viaCepData.street;
        district ??= viaCepData.district;
        city ??= viaCepData.city;
      }
    }

    if (!street || !district || !city) {
      throw new BadRequestException('Endereço incompleto. Forneça mais dados ou um CEP válido.');
    }

    return this.prisma.address.create({
      data: {
        cep: dto.cep,
        street,
        number: dto.number ?? '',
        complement: dto.complement ?? '',
        district,
        city,
        userId,
      },
    });
  }

  async findMy(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { street: 'asc' },
    });
  }

  async findById(id: string) {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!address) throw new NotFoundException('Endereço não encontrado');

    return address;
  }

  async update(userId: string, id: string, dto: UpdateAddressDto) {
    const address = await this.findById(id);

    if (address.userId !== userId) {
      throw new BadRequestException('Você não pode editar esse endereço');
    }

    // Atualização baseada em CEP automático
    if (dto.cep && (!dto.street || !dto.city || !dto.district)) {
      const viaCepData = await this.fetchViaCep(dto.cep);
      if (viaCepData) {
        dto.street ??= viaCepData.street;
        dto.district ??= viaCepData.district;
        dto.city ??= viaCepData.city;
      }
    }

    return this.prisma.address.update({
      where: { id },
      data: dto,
    });
  }

  async delete(userId: string, id: string) {
    const address = await this.findById(id);

    if (address.userId !== userId) {
      throw new BadRequestException('Você não pode remover esse endereço');
    }

    return this.prisma.address.delete({
      where: { id },
    });
  }
}
