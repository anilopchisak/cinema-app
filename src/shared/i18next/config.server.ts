import 'server-only';

import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const createI18nServerInstance = async (language: string) => {
  const instance = createInstance();

  instance.use(
    resourcesToBackend(async (lng: string, namespace: string) => {
      const filePath = path.join(process.cwd(), 'public', 'locales', lng, `${namespace}.json`);
      const file = await readFile(filePath, 'utf-8');
      return JSON.parse(file);
    })
  );

  await instance.init({
    lng: language,
    fallbackLng: 'ru',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    preload: [],
  });

  return instance;
};
