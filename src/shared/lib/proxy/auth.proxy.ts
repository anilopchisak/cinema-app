import { NextRequest, NextResponse } from 'next/server';

export function handleAuth(request: NextRequest): NextResponse | null {
  const authToken = request.cookies.get('auth_token')?.value;

  const { pathname } = request.nextUrl;

  const isPrivatePage = pathname.startsWith('/favorites');
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  // если пользователь не авторизован и пытается попасть на приватную страницу,
  // редиректим его на страницу логина
  if (!authToken && isPrivatePage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // если пользователь авторизован и пытается попасть на страницу логина или регистрации,
  // редиректим его на страницу профиля
  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL('/favorites', request.url));
  }

  return null;
}
