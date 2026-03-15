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

export default async function Favorites() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect(routes.login.create());
  }

  const dehydratedState = await prefetchFavorites();

  return (
    <Suspense
      fallback={
        <>
          <div className={s.sectionHeader}>
            <Text tag="h1" view="title" weight="bold">
              Избранное
            </Text>
          </div>
          <CinemaListSkeleton />
        </>
      }
    >
      <div>
        <div className={s.sectionHeader}>
          <Text tag="h1" view="title" weight="bold">
            Избранное
          </Text>
        </div>

        <HydrationBoundary state={dehydratedState}>
          <FavoritesPage />
        </HydrationBoundary>
      </div>
    </Suspense>
  );
}
