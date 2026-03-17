'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

/** Провайдер для React Query*/
export default function QueryProvider({ children }: { children: ReactNode }) {
  /** Создаем экземпляр QueryClient один раз с помощью useState,
   * чтобы избежать пересоздания при ререндерах
   * */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
