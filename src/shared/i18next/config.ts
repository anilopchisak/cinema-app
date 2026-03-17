import { Resource, createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

/** Функция для создания экземпляра i18next (используется на сервере и клиенте) */
export const createI18nInstance = (language: string, resources?: Resource) => {
  const instance = createInstance();

  instance.use(initReactI18next).use(
    resourcesToBackend(async (language: string, namespace: string) => {
      // Файлы в `public/` нельзя импортировать через bundler.
      // На клиенте грузим их через fetch, на сервере читаем с диска.
      if (typeof window !== 'undefined') {
        const res = await fetch(`/locales/${language}/${namespace}.json`);
        if (!res.ok) {
          throw new Error(`Failed to load i18n resource: ${language}/${namespace} (${res.status})`);
        }
        return res.json();
      }

      const { readFile } = await import('node:fs/promises');
      const path = await import('node:path');
      const filePath = path.join(process.cwd(), 'public', 'locales', language, `${namespace}.json`);
      const file = await readFile(filePath, 'utf-8');
      return JSON.parse(file);
    })
  );

  void instance.init({
    lng: language,
    fallbackLng: 'ru',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    preload: [],
  });

  return instance;
};
