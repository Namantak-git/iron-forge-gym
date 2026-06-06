import { prisma } from '../config/prisma';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { env } from '../config/env';
import { MembershipStatus, PaymentStatus, Role } from '@prisma/client';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export class GymService {
  // Memberships
  static async getMemberships() {
    return prisma.membership.findMany();
  }

  static async createMembership(data: { name: string; price: number; durationMonths: number; description?: string }) {
    return prisma.membership.create({ data });
  }

  // Payments (Razorpay)
  static async createPaymentOrder(userId: string, membershipId: string) {
    const membership = await prisma.membership.findUnique({
      where: { id: membershipId },
    });

    if (!membership) throw { status: 404, message: 'Membership package not found' };

    // Create Razorpay Order
    const options = {
      amount: Math.round(membership.price * 100), // in paise
      currency: 'INR',
      receipt: `receipt_user_${userId.substring(0, 8)}`,
    };

    const order = await razorpay.orders.create(options);

    // Save pending payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        membershipId,
        amount: membership.price,
        status: PaymentStatus.PENDING,
        razorpayOrderId: order.id,
      },
    });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment.id,
    };
  }

  static async verifyPaymentSignature(body: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;
    const keySecret = env.RAZORPAY_KEY_SECRET;

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      throw { status: 400, message: 'Invalid payment signature verification failed' };
    }

    // Update payment
    const payment = await prisma.payment.update({
      where: { razorpayOrderId },
      data: {
        status: PaymentStatus.SUCCESS,
        razorpayPaymentId,
      },
    });

    // Update member profile status to ACTIVE
    const profile = await prisma.memberProfile.findFirst({
      where: { userId: payment.userId },
    });

    if (profile) {
      await prisma.memberProfile.update({
        where: { id: profile.id },
        data: {
          status: MembershipStatus.ACTIVE,
          membershipId: payment.membershipId,
        },
      });
    }

    return { success: true, payment };
  }

  // Attendance logging
  static async logCheckIn(userId: string) {
    // Check if user already checked in today and not checked out
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await prisma.attendance.findFirst({
      where: {
        userId,
        checkIn: { gte: today },
        checkOut: null,
      },
    });

    if (existingLog) {
      throw { status: 400, message: 'User already checked in and on the gym floor' };
    }

    return prisma.attendance.create({
      data: {
        userId,
        checkIn: new Date(),
      },
    });
  }

  static async logCheckOut(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await prisma.attendance.findFirst({
      where: {
        userId,
        checkIn: { gte: today },
        checkOut: null,
      },
    });

    if (!existingLog) {
      throw { status: 400, message: 'No active check-in session found' };
    }

    return prisma.attendance.update({
      where: { id: existingLog.id },
      data: {
        checkOut: new Date(),
      },
    });
  }

  // Analytics
  static async getAdminOverview() {
    const totalMembers = await prisma.user.count({ where: { role: Role.MEMBER } });
    const activeMembers = await prisma.memberProfile.count({ where: { status: MembershipStatus.ACTIVE } });
    const totalTrainers = await prisma.user.count({ where: { role: Role.TRAINER } });
    
    // Revenue sum
    const successfulPayments = await prisma.payment.findMany({
      where: { status: PaymentStatus.SUCCESS },
      select: { amount: true },
    });
    const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0);

    // Latest checkins
    const latestCheckins = await prisma.attendance.findMany({
      take: 5,
      orderBy: { checkIn: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return {
      stats: {
        totalMembers,
        activeMembers,
        totalTrainers,
        totalRevenue,
      },
      latestCheckins,
    };
  }
}
