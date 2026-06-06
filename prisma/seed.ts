import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  // Create default memberships
  const memberships = [
    {
      name: 'Silver Starter',
      price: 1500,
      durationMonths: 1,
      description: 'Access to cardio and strength training sections. 1-month validity.',
    },
    {
      name: 'Gold Quarterly',
      price: 4000,
      durationMonths: 3,
      description: 'Access to gym + 2 sessions with a trainer. 3-months validity.',
    },
    {
      name: 'Iron Platinum (Annual)',
      price: 12000,
      durationMonths: 12,
      description: 'All-inclusive access. Steam bath, group classes, and dedicated personal trainer.',
    },
  ];

  for (const plan of memberships) {
    await prisma.membership.upsert({
      where: { name: plan.name },
      update: {},
      create: plan,
    });
  }
  console.log('Created default memberships.');

  // Create default Admin
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ironforge.com' },
    update: {},
    create: {
      name: 'Chief Admin',
      email: 'admin@ironforge.com',
      password: adminPasswordHash,
      role: Role.ADMIN,
    },
  });
  console.log('Admin user verified:', adminUser.email);

  // Create default Trainer
  const trainerPasswordHash = await bcrypt.hash('trainer123', 10);
  const trainerUser = await prisma.user.upsert({
    where: { email: 'trainer1@ironforge.com' },
    update: {},
    create: {
      name: 'Alex Mercer',
      email: 'trainer1@ironforge.com',
      password: trainerPasswordHash,
      role: Role.TRAINER,
      trainerProfile: {
        create: {
          bio: 'Elite strength coach and nutrition specialist with 8+ years experience.',
          specializations: ['Bodybuilding', 'Powerlifting', 'Keto Diets'],
          qualifications: ['CSCS Certified', 'B.Sc. Sports Science'],
        },
      },
    },
  });
  console.log('Trainer user verified:', trainerUser.email);

  // Create default Member
  const memberPasswordHash = await bcrypt.hash('member123', 10);
  const silverPlan = await prisma.membership.findFirst({ where: { name: 'Silver Starter' } });
  const trainerProfile = await prisma.trainerProfile.findFirst({ where: { userId: trainerUser.id } });

  const memberUser = await prisma.user.upsert({
    where: { email: 'member1@ironforge.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'member1@ironforge.com',
      password: memberPasswordHash,
      role: Role.MEMBER,
      memberProfile: {
        create: {
          phone: '9876543210',
          gender: 'Male',
          height: 180,
          weight: 75,
          bmi: 23.1,
          targetWeight: 80,
          status: 'ACTIVE',
          membershipId: silverPlan?.id,
          trainerId: trainerProfile?.id,
        },
      },
    },
  });
  console.log('Member user verified:', memberUser.email);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
