import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing products
  await prisma.booking.deleteMany();
  await prisma.product.deleteMany();

  // Create products matching frontend data
  const schloss = await prisma.product.create({
    data: {
      name: 'Hüpfburg „Schloss"',
      description:
        'Elegante weiße Burg – das Highlight für Kindergeburtstage und Familienfeste.',
      price: 120,
      imageUrl: 'assets/images/castle-placeholder.jpeg',
      size: '3x3.5m',
      active: true,
    },
  });

  const bubbleHouse = await prisma.product.create({
    data: {
      name: 'Hüpfburg „Bubble House"',
      description:
        'Transparente Glaskuppel – ein magisches Erlebnis für besondere Anlässe.',
      price: 180,
      imageUrl: 'assets/images/bubble-house.jpeg',
      size: '3x4m',
      active: true,
    },
  });

  console.log(`✅ Created product: ${schloss.name} (id: ${schloss.id})`);
  console.log(`✅ Created product: ${bubbleHouse.name} (id: ${bubbleHouse.id})`);
  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
