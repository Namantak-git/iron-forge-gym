import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths requiring authentication
  const isAdminPath = pathname.startsWith('/dashboard/admin');
  const isTrainerPath = pathname.startsWith('/dashboard/trainer');
  const isMemberPath = pathname.startsWith('/dashboard/member');
  const isDashboard = isAdminPath || isTrainerPath || isMemberPath;

  // Retrieve JWT token
  const token = request.cookies.get('auth-token')?.value;

  if (isDashboard) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = verifyToken(token);
    if (!payload) {
      // Token invalid or expired
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }

    // Role-based access control checking
    if (isAdminPath && payload.role !== 'ADMIN') {
      return redirectToOwnDashboard(payload.role, request);
    }
    if (isTrainerPath && payload.role !== 'TRAINER') {
      return redirectToOwnDashboard(payload.role, request);
    }
    if (isMemberPath && payload.role !== 'MEMBER') {
      return redirectToOwnDashboard(payload.role, request);
    }
  }

  // Redirect authenticated user away from auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register';
  if (isAuthPage && token) {
    const payload = verifyToken(token);
    if (payload) {
      return redirectToOwnDashboard(payload.role, request);
    }
  }

  return NextResponse.next();
}

function redirectToOwnDashboard(role: string, request: NextRequest) {
  const lowercaseRole = role.toLowerCase();
  return NextResponse.redirect(new URL(`/dashboard/${lowercaseRole}`, request.url));
}

// Config to specify matching paths
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
