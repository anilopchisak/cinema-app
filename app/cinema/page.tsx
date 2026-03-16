import { prefetchCinema } from '@/entities/cinema/api/queries/prefetch-cinema';
import { prefetchFavorites } from '@/entities/favorites/api/queries/prefetch-favorites';
import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
import CinemaIntro from '@/widgets/cinema/CinemaIntro';
import { HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import CinemaListSkeleton from '@/widgets/cinema/CinemaList/skeleton';
import Seo from '@/shared/ui/Seo';
import CinemaFilters from '@/widgets/cinema/CinemaFilters';
import dynamic from 'next/dynamic';

const CinemaContent = dynamic(() => import('@/widgets/cinema/CinemaContent/CinemaContent'), {
  ssr: true,
  loading: () => <CinemaListSkeleton />,
});

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Cinema({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  /** Преобразуем параметры запроса в структуру,
   * разделяя параметры для API и для UI/путей */
  const params = getCinemaParams(resolvedSearchParams);

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  let dehydratedState;

  if (token) {
    /** Если пользователь авторизован,
     * предзагружаем и фильмы, и избранное параллельно */
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

  const hasFilters = Boolean(
    params.rawParams.category?.length ||
    params.rawParams.releaseYear ||
    (params.rawParams.sort && params.rawParams.sort !== 'default') ||
    params.rawParams.search
  );

  const noindex = hasFilters || (params?.rawParams?.page ?? 1) > 1;

  /** Формируем канонический URL:
   * - при фильтрах → /cinema (без параметров)
   * - при чистой пагинации (page > 1) → /cinema?page=N
   * - для первой страницы без фильтров → /cinema
   */
  let canonicalUrl: string | undefined;
  if (hasFilters) {
    canonicalUrl = '/cinema';
  } else if ((params?.rawParams?.page ?? 1) > 1) {
    canonicalUrl = `/cinema?page=${params.rawParams.page}`;
  } else {
    canonicalUrl = '/cinema';
  }

  return (
    <>
      <Seo
        title="Все фильмы"
        description="Огромный выбор фильмов с удобной фильтрацией и сортировкой. Смотрите онлайн бесплатно. А если искать не хочется, попробуйте рандомайзер."
        keywords="рандомный фильм, рандомайзер, фильмы, по рейтингу, по алфавиту"
        noindex={noindex}
        canonical={canonicalUrl}
      />

      <CinemaIntro />
      <CinemaFilters params={params.rawParams} />

      <Suspense fallback={<CinemaListSkeleton />}>
        <HydrationBoundary state={dehydratedState}>
          <CinemaContent rawParams={params.rawParams} apiParams={params.apiParams} />
        </HydrationBoundary>
      </Suspense>
    </>
  );
}
