import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Return users
    const users = await prisma.user.findMany({
      include: {
        memberProfile: {
          include: {
            membership: true,
            trainer: {
              include: {
                user: {
                  select: { name: true }
                }
              }
            }
          }
        },
        trainerProfile: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Admin users API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
