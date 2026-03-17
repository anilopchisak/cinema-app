'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18nClientInstance } from './config.client';

export default function I18nClientProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [i18nInstance] = useState(() => createI18nClientInstance(locale));

  useEffect(() => {
    // запуск инициализации без ожидания завершения, потому что реакт все равно перерисует компоненты после подгрузки
    void i18nInstance.changeLanguage(locale);
  }, [i18nInstance, locale]);

  return (
    <I18nextProvider i18n={i18nInstance} defaultNS={'common'}>
      {children}
    </I18nextProvider>
  );
}
