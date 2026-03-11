'use client';

import { authStore } from '@/entities/auth/model/auth.store';
// import { useCinemaParams } from '@/entities/cinema/hooks/useCinemaParams';
import { Suspense } from 'react';
import CinemaListSkeleton from '../CinemaList/skeleton';
import CinemaList from '../CinemaList/CinemaList';
import useCinemaState from '@/entities/cinema/api/hooks/useCinemaState';
import useFavoritesState from '@/entities/favorites/api/hooks/useFavoritesState';
import useSyncCinemaPage from '@/entities/cinema/hooks/useSyncCinemaPage';
import useScrollRestoration from '@/shared/hooks/useScrollRestoration';
import CinemaFilters from '../CinemaFilters';
// import useCinemaQueryString from '@/entities/cinema/hooks/useCinemaQueryString';
import { observer } from 'mobx-react-lite';
import useCinemaParams from '@/entities/cinema/hooks/test/useCinemaParams';

const CinemaContent = observer(() => {
  const isAuthenticated = authStore.isAuthenticated;

  const { rawParams, apiParams } = useCinemaParams();

  const query = useCinemaState(apiParams, rawParams.page);
  const queryFavorites = useFavoritesState({ isAuthenticated });

  /** Флаг готовности страницы к восстановлению скролла. */
  const isReadyToRestore = !query.isLoading && !query.isFetchingNextPage && !!query.data;

  useScrollRestoration({
    storageKey: 'cinema-scroll',
    isReadyToRestore,
  });

  useSyncCinemaPage({ data: query.data, currentPage: rawParams.page });

  return (
    <>
      <CinemaFilters params={rawParams} />
      <Suspense fallback={<CinemaListSkeleton />}>
        <CinemaList queryFilms={query} queryFavorites={queryFavorites} />
      </Suspense>
    </>
  );
});

export default CinemaContent;
