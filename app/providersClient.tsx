'use client';

import '@/shared/mobx/staticRendering';
import QueryProvider from './query-provider';
import { StoreProvider } from './store-provider';
import Message from '@/shared/ui/Message';
import ScrollToTopButton from '@/features/cinema/ui/ScrollToTopButton/ScrollToTopButton';
import VideoModalProvider from '@/features/video-modal/ui';
import I18nClientProvider from '@/shared/i18next/i18nextClientProvider';

/** Клиентский слой глобальных провайдеров и UI */
export function ProvidersClient({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <QueryProvider>
      <I18nClientProvider locale={locale}>
        <StoreProvider>
          <>
            {children}
            <VideoModalProvider />
            <Message />
            <ScrollToTopButton />
          </>
        </StoreProvider>
      </I18nClientProvider>
    </QueryProvider>
  );
}

