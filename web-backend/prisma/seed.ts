import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedPricing() {
  await prisma.pricing.deleteMany({});
  console.log('✅ Tabela Pricing limpa');

  await prisma.pricing.createMany({
    data: [
      { serviceType: 'Lavagem simples', vehicleCategory: 'Hatch', priceCents: 8000 },
      { serviceType: 'Lavagem simples', vehicleCategory: 'Sedan', priceCents: 9000 },
      { serviceType: 'Lavagem simples', vehicleCategory: 'SUV', priceCents: 9500 },
      { serviceType: 'Lavagem simples', vehicleCategory: 'Caminhonete', priceCents: 12000 },

      { serviceType: 'Lavagem completa', vehicleCategory: 'Hatch', priceCents: 10000 },
      { serviceType: 'Lavagem completa', vehicleCategory: 'Sedan', priceCents: 11000 },
      { serviceType: 'Lavagem completa', vehicleCategory: 'SUV', priceCents: 11500 },
      { serviceType: 'Lavagem completa', vehicleCategory: 'Caminhonete', priceCents: 15000 },
    ],
  });

  console.log('✅ Pricing populado');
}

async function createUserWithData() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { email: 'cliente@teste.com' },
    update: {},
    create: {
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      password: hashedPassword,
      phone: '61999999999',
      role: 'USER',

      cars: {
        create: [
          {
            name: 'Carro Teste',
            plate: 'ABC1234',
            brand: 'Volkswagen',
            model: 'Gol',
            category: 'Hatch',
          },
        ],
      },

      addresses: {
        create: [
          {
            cep: '70000000',
            street: 'Rua Teste',
            number: '123',
            district: 'Centro',
            city: 'Brasília',
          },
        ],
      },
    },
    include: {
      cars: true,
      addresses: true,
    },
  });

  return user;
}


async function createAppointments(user) {
  const appointmentPix = await prisma.appointment.create({
    data: {
      serviceType: 'Lavagem simples',
      date: new Date(),
      time: '14:00',
      priceCents: 8000,
      userId: user.id,
      carId: user.cars[0].id,
      addressId: user.addresses[0].id,
    },
  });

  const appointmentCard = await prisma.appointment.create({
    data: {
      serviceType: 'Lavagem completa',
      date: new Date(),
      time: '15:00',
      priceCents: 11000,
      userId: user.id,
      carId: user.cars[0].id,
      addressId: user.addresses[0].id,
    },
  });

  return { appointmentPix, appointmentCard };
}

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('Admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@waveon.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@waveon.com',
      password: hashedPassword,
      phone: '61988888888',
      role: 'ADMIN',
    },
  });
}

async function main() {
  console.log('🌱 Iniciando seed...');

  await seedPricing();

  const user = await createUserWithData();
  const { appointmentPix, appointmentCard } = await createAppointments(user);

  await createAdmin();

  console.log('--------------------------------');
  console.log('🎉 SEED CONCLUÍDA COM SUCESSO!');
  console.log('🔹 userId:', user.id);
  console.log('🔹 carId:', user.cars[0].id);
  console.log('🔹 addressId:', user.addresses[0].id);
  console.log('--------------------------------');
  console.log('🔵 appointmentPixId:', appointmentPix.id);
  console.log('🟣 appointmentCardId:', appointmentCard.id);
  console.log('--------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
