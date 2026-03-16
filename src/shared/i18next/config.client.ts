import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const createI18nClientInstance = (language: string) => {
  const instance = createInstance();

  instance.use(initReactI18next).use(
    resourcesToBackend(async (lng: string, namespace: string) => {
      const res = await fetch(`/locales/${lng}/${namespace}.json`);
      if (!res.ok) {
        throw new Error(`Failed to load i18n resource: ${lng}/${namespace} (${res.status})`);
      }
      return res.json();
    })
  );

  void instance.init({
    lng: language,
    fallbackLng: 'ru',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

  return instance;
};

