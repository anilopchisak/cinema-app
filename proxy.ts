import { handleAuth } from '@/shared/lib/proxy/auth.proxy';
import { handleLocale } from '@/shared/lib/proxy/locale.proxy';
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const authResponse = handleAuth(request);
  if (authResponse) {
    return authResponse;
  }

  const localeResponse = handleLocale(request);
  if (localeResponse) {
    return localeResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/favorites/:path*', '/login', '/register', '/((?!_next|api|favicon.ico).*)'],
};
