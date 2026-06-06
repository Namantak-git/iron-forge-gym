import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, error: 'Not authenticated' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false, error: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ authenticated: false, error: 'User not found' }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user });
  } catch (error) {
    console.error('Auth session error:', error);
    return NextResponse.json({ authenticated: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST to logout
export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Delete cookie
    path: '/',
  });

  return response;
}
