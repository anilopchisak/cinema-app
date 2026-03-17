import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const createI18nClientInstance = (language: string) => {
  const instance = createInstance();

  instance.use(initReactI18next).use(
    resourcesToBackend((lng: string, namespace: string) =>
      import(`./locales/${lng}/${namespace}.json`).then((m) => m.default ?? m)
    )
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

