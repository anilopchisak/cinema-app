import { prefetchCinema } from '@/entities/cinema/api/queries/prefetch-cinema';
import { prefetchFavorites } from '@/entities/favorites/api/queries/prefetch-favorites';
import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
import CinemaContent from '@/widgets/cinema/CinemaContent/CinemaContent';
import CinemaIntro from '@/widgets/cinema/CinemaIntro';
import { HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import CinemaFiltersSkeleton from '@/widgets/cinema/CinemaFilters/skeleton/CinemaFiltersSkeleton';
import CinemaListSkeleton from '@/widgets/cinema/CinemaList/skeleton';
import Seo from '@/shared/ui/Seo';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Cinema({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const params = getCinemaParams(resolvedSearchParams);

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  let dehydratedState;

  if (token) {
    const [cinemaState, favoritesState] = await Promise.all([
      prefetchCinema(params.apiParams, params.rawParams.page),
      prefetchFavorites(),
    ]);

    dehydratedState = {
      ...cinemaState,
      queries: [...(cinemaState.queries ?? []), ...(favoritesState.queries ?? [])],
      mutations: [...(cinemaState.mutations ?? []), ...(favoritesState.mutations ?? [])],
    };
  } else {
    dehydratedState = await prefetchCinema(params.apiParams, params.rawParams.page);
  }

  return (
    <>
      <Seo
        title="Все фильмы"
        description="Огромный выбор фильмов с удобной фильтрацией и сортировкой. Смотрите онлайн бесплатно. А если искать не хочется, попробуйте рандомайзер."
        keywords="рандомный фильм, рандомайзер, фильмы, по рейтингу, по алфавиту"
      />
      <Suspense
        fallback={
          <>
            <CinemaIntro />
            <CinemaFiltersSkeleton />
            <CinemaListSkeleton />
          </>
        }
      >
        <div>
          <CinemaIntro />
          <HydrationBoundary state={dehydratedState}>
            <CinemaContent rawParams={params.rawParams} apiParams={params.apiParams} />
          </HydrationBoundary>
        </div>
      </Suspense>
    </>
  );
}
