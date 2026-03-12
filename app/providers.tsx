'use client';

// import { VideoModal } from '@/features/video-modal';
import QueryProvider from './query-provider';
import { StoreProvider } from './store-provider';
import { Suspense } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryProvider>
        <StoreProvider>
          <Suspense fallback={<div>Загрузка...</div>}>{children}</Suspense>
        </StoreProvider>
      </QueryProvider>
      {/* <VideoModal /> */}
    </>
  );
}
