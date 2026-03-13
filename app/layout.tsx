import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import MainLayout from '@/shared/ui/layout/MainLayout';
import { Providers } from './providers';
import { Suspense } from 'react';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'CinemaКино',
  icons: {
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon', rel: 'shortcut icon' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'CinemaКино',
    capable: true,
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.variable}>
        <Providers>
          <MainLayout>
            <Suspense fallback={<div>Загрузка...</div>}>{children}</Suspense>
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
