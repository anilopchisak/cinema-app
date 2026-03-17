import 'server-only';
// гарантирует, что этот файл никогда не попадёт в клиентский бандл.
// Если по ошибке импортировать его в клиентском компоненте,
// сборка упадёт с ошибкой. Это важная защита от случайного
// использования серверного кода (с fs) на клиенте.

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

  // на сервере необходимо дождаться завершения инициализации, в отличие от клиента
  // если не дождаться инициализации, переводы могут отсутствовать.
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
