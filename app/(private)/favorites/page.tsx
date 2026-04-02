import FavoritesPage from '@/_pages/FavoritesPage/FavoritesPage';
import { prefetchFavorites } from '@/entities/favorites/api/queries/prefetch-favorites';
import { routes } from '@/shared/config/routes';
import Text from '@/shared/ui/Text';
import { HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import s from '@/widgets/cinema/CinemaList/CinemaList.module.scss';
import { Suspense } from 'react';
import CinemaListSkeleton from '@/widgets/cinema/CinemaList/skeleton';
import { getServerTranslations } from '@/shared/i18next/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Избранные фильмы | CinemaКино',
    description: 'Ваш личный список избранных фильмов. Сохраняйте понравившиеся и смотрите позже.',
    keywords: 'избранное, закладки, сохраненные фильмы',
    robots: 'noindex',
  };
}

export default async function Favorites() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect(routes.login.create());
  }

  const dehydratedState = await prefetchFavorites();

  const { t } = await getServerTranslations();

  return (
    <>
      <div className={s.sectionHeader}>
        <Text tag="h1" view="title" weight="bold">
          {t('nav.favorites')}
        </Text>
      </div>
      <Suspense fallback={<CinemaListSkeleton />}>
        <HydrationBoundary state={dehydratedState}>
          <FavoritesPage />
        </HydrationBoundary>
      </Suspense>
    </>
  );
}
