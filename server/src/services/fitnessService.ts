import { prisma } from '../config/prisma';

export class FitnessService {
  // Trainer Roster & Bios
  static async getTrainers() {
    return prisma.trainerProfile.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    });
  }

  static async updateTrainerProfile(userId: string, data: { bio?: string; specializations?: string[]; qualifications?: string[] }) {
    return prisma.trainerProfile.update({
      where: { userId },
      data,
    });
  }

  // Client list assigned to trainer
  static async getTrainerClients(trainerUserId: string) {
    const trainer = await prisma.trainerProfile.findUnique({
      where: { userId: trainerUserId },
    });

    if (!trainer) throw { status: 404, message: 'Trainer profile not found' };

    return prisma.memberProfile.findMany({
      where: { trainerId: trainer.id },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
  }

  // Workouts
  static async getWorkoutPlan(memberUserId: string) {
    const profile = await prisma.memberProfile.findUnique({
      where: { userId: memberUserId },
    });

    if (!profile) throw { status: 404, message: 'Member profile not found' };

    return prisma.workoutPlan.findFirst({
      where: { memberId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async assignWorkoutPlan(trainerUserId: string, data: { memberId: string; title: string; routines: any }) {
    const trainer = await prisma.trainerProfile.findUnique({
      where: { userId: trainerUserId },
    });
    if (!trainer) throw { status: 404, message: 'Trainer not found' };

    return prisma.workoutPlan.create({
      data: {
        trainerId: trainer.id,
        memberId: data.memberId,
        title: data.title,
        routines: data.routines,
      },
    });
  }

  // Diets
  static async getDietPlan(memberUserId: string) {
    const profile = await prisma.memberProfile.findUnique({
      where: { userId: memberUserId },
    });

    if (!profile) throw { status: 404, message: 'Member profile not found' };

    return prisma.dietPlan.findFirst({
      where: { memberId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async assignDietPlan(trainerUserId: string, data: { memberId: string; title: string; meals: any }) {
    const trainer = await prisma.trainerProfile.findUnique({
      where: { userId: trainerUserId },
    });
    if (!trainer) throw { status: 404, message: 'Trainer not found' };

    return prisma.dietPlan.create({
      data: {
        trainerId: trainer.id,
        memberId: data.memberId,
        title: data.title,
        meals: data.meals,
      },
    });
  }

  // Progress Logging
  static async getProgressLogs(memberUserId: string) {
    const profile = await prisma.memberProfile.findUnique({
      where: { userId: memberUserId },
    });
    if (!profile) throw { status: 404, message: 'Member profile not found' };

    return prisma.progressLog.findMany({
      where: { memberId: profile.id },
      orderBy: { loggedAt: 'desc' },
    });
  }

  static async logProgress(memberUserId: string, data: { weight: number; bodyFat?: number; muscleMass?: number; photoUrl?: string }) {
    const profile = await prisma.memberProfile.findUnique({
      where: { userId: memberUserId },
    });
    if (!profile) throw { status: 404, message: 'Member profile not found' };

    // Update current weight/bmi in member profile
    const heightM = profile.height ? profile.height / 100 : 0;
    const bmi = heightM > 0 ? data.weight / (heightM * heightM) : undefined;

    await prisma.memberProfile.update({
      where: { id: profile.id },
      data: {
        weight: data.weight,
        bmi,
      },
    });

    return prisma.progressLog.create({
      data: {
        memberId: profile.id,
        weight: data.weight,
        bodyFat: data.bodyFat,
        muscleMass: data.muscleMass,
        photoUrl: data.photoUrl,
      },
    });
  }
}
