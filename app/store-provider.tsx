'use client';

import { useEffect, type PropsWithChildren } from 'react';
import '@/shared/mobx/mobx.config';
import { authStore } from '@/entities/auth/model/auth.store';

/** Провайдер для инициализации MobX сторов
 * при монтировании приложения */
export const StoreProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    authStore.initialize();
  }, []);

  return <>{children}</>;
};
