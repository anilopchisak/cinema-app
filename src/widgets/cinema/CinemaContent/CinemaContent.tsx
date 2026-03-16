'use client';

import { authStore } from '@/entities/auth/model/auth.store';
import CinemaList from '../CinemaList/CinemaList';
import useCinemaState from '@/entities/cinema/api/hooks/useCinemaState';
import useFavoritesState from '@/entities/favorites/api/hooks/useFavoritesState';
import useScrollRestoration from '@/shared/hooks/useScrollRestoration';
import { observer } from 'mobx-react-lite';
import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
import CinemaListSkeleton from '../CinemaList/skeleton';
import ComponentTransition from '@/shared/ui/ComponentTransition';

type Props = {
  rawParams: ReturnType<typeof getCinemaParams>['rawParams'];
  apiParams: ReturnType<typeof getCinemaParams>['apiParams'];
};

const CinemaContent = observer(({ rawParams, apiParams }: Props) => {
  const isAuthenticated = authStore.isAuthenticated;

  const query = useCinemaState(apiParams, rawParams.page);
  const queryFavorites = useFavoritesState({ isAuthenticated });

  /** Флаг готовности страницы к восстановлению скролла. */
  const isReadyToRestore = !query.isLoading && !query.isFetchingNextPage && !!query.data;

  useScrollRestoration({
    storageKey: 'cinema-scroll',
    isReadyToRestore,
  });

  return (
    <>
      <ComponentTransition
        isLoading={query.isLoading && !query.isFetchingNextPage}
        skeleton={<CinemaListSkeleton />}
      >
        <CinemaList queryFilms={query} queryFavorites={queryFavorites} />
      </ComponentTransition>
    </>
  );
});

export default CinemaContent;
