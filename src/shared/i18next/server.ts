import 'server-only'; // гарантирует, что этот код не попадёт в клиентский бандл
import { createI18nServerInstance } from './config.server';
import { defaultLocale } from '@/shared/lib/proxy/locale.proxy';
import { cookies } from 'next/headers';

export async function getServerTranslations(namespace = 'common') {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || defaultLocale;

  const i18nInstance = createI18nServerInstance(locale);
  await i18nInstance.loadNamespaces(namespace);

  return {
    t: i18nInstance.getFixedT(locale, namespace),
    i18n: i18nInstance,
    locale,
  };
}
