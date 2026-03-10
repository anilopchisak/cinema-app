'use client';

import { authStore } from '@/entities/auth/model/auth.store';
import { useCinemaParams } from '@/entities/cinema/hooks/useCinemaParams';
import { Suspense } from 'react';
import CinemaListSkeleton from '../CinemaList/skeleton';
import CinemaList from '../CinemaList/CinemaList';
import useCinemaState from '@/entities/cinema/api/hooks/useCinemaState';
import useFavoritesState from '@/entities/favorites/api/hooks/useFavoritesState';
import useSyncCinemaPage from '@/entities/cinema/hooks/useSyncCinemaPage';
import useScrollRestoration from '@/shared/hooks/useScrollRestoration';
import CinemaFilters from '../CinemaFilters';

export default function CinemaContent({ initialParams }: { initialParams: any }) {
  const isAuthenticated = authStore.isAuthenticated;

  const { params, setSearch, setCategory, setSort, setPage, apiParams } =
    useCinemaParams(initialParams);

  const query = useCinemaState(apiParams, params.page);
  const queryFavorites = useFavoritesState({ isAuthenticated });

  /** Флаг готовности страницы к восстановлению скролла. */
  const isReadyToRestore = !query.isLoading && !query.isFetchingNextPage && !!query.data;

  useScrollRestoration({
    storageKey: 'cinema-scroll',
    isReadyToRestore,
  });

  useSyncCinemaPage({ data: query.data, currentPage: params.page, setPage });

  return (
    <>
      <CinemaFilters
        params={params}
        setSearch={setSearch}
        setCategory={setCategory}
        setSort={setSort}
      />
      <Suspense fallback={<CinemaListSkeleton />}>
        <CinemaList queryFilms={query} queryFavorites={queryFavorites} />
      </Suspense>
    </>
  );
}
