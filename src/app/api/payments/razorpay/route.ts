import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token session' }, { status: 401 });
    }

    const body = await request.json();
    const { membershipId } = body;

    const plan = await prisma.membership.findUnique({
      where: { id: membershipId },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    // Mock Razorpay Order Creation
    // In production: const order = await razorpay.orders.create({ amount: plan.price * 100, currency: 'INR', receipt: '...' })
    const mockOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;

    // Log payment attempt in database
    const payment = await prisma.payment.create({
      data: {
        userId: payload.userId,
        membershipId: plan.id,
        amount: plan.price,
        status: 'PENDING',
        razorpayOrderId: mockOrderId,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: plan.price * 100, // in paise
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_keys',
      name: 'Iron Forge Gym',
      description: `Subscription for ${plan.name}`,
    });
  } catch (error: any) {
    console.error('Razorpay API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
