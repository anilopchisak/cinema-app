import { cookies } from 'next/headers';
import { defaultLocale } from '@/shared/lib/proxy/locale.proxy';
import { ProvidersClient } from './providersClient';

/** Провайдер, объединяющий все глобальные провайдеры
 * и UI-компоненты приложения */
export async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || defaultLocale;

  return <ProvidersClient locale={locale}>{children}</ProvidersClient>;
}
