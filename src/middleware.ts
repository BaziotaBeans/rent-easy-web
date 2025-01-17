import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const userData = request.cookies.get('userData')?.value;

  if (!token || !userData) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  try {
    const user = JSON.parse(userData);
    const userRoles = user.roles || [];
    const path = request.nextUrl.pathname;

    // Role-based route protection
    if (path.startsWith('/myrenteasy') && !userRoles.includes('ROLE_USER')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (path.startsWith('/admin') && !userRoles.includes('ROLE_ADMIN')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (path.startsWith('/agent') && !userRoles.includes('ROLE_COMPANY')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
}

export const config = {
  matcher: [
    '/myrenteasy/:path*',
    '/admin/:path*',
    '/agent/:path*',
    '/property:path*',
    '/api:path*',
  ],
};