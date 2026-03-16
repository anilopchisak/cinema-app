'use client';

import QueryProvider from './query-provider';
import { StoreProvider } from './store-provider';
import Message from '@/shared/ui/Message';
import ScrollToTopButton from '@/features/cinema/ui/ScrollToTopButton/ScrollToTopButton';
import VideoModalProvider from '@/features/video-modal/ui';

/** Провайдер, объединяющий все глобальные провайдеры
 * и UI-компоненты приложения */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryProvider>
        <StoreProvider>
          <>
            {children}
            <VideoModalProvider />
            <Message />
            <ScrollToTopButton />
          </>
        </StoreProvider>
      </QueryProvider>
    </>
  );
}
