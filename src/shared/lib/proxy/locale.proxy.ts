import { NextRequest, NextResponse } from 'next/server';

export const locales = ['en', 'ru'];
export const defaultLocale = 'ru';

export const getLocale = (request: NextRequest) => {
  /** Проверяем куки */
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  /** Проверяем Accept-Language */
  const acceptLang = request.headers.get('accept-language');
  if (acceptLang) {
    const preferred = acceptLang.split(',')[0].split('-')[0];
    if (locales.includes(preferred)) {
      return preferred;
    }
  }

  return defaultLocale;
};

export function handleLocale(request: NextRequest): NextResponse | null {
  const locale = getLocale(request);

  /** Если язык изменился или отсутствует в куках, устанавливаем куку */
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
