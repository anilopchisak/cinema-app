'use client';

import type {
  DefinedUseQueryResult,
  UseInfiniteQueryResult,
  UseQueryResult,
} from '@tanstack/react-query';
import s from './CinemaList.module.scss';
import Text from '@/shared/ui/Text';
import { useCallback, useMemo, useRef } from 'react';
import { routes } from '@/shared/config/routes';
import Loader from '@/shared/ui/Loader';
import type { Film } from '@/entities/cinema/types/cinema.types';
import type { TransformedData } from '@/shared/api/query/useGetAllInfinite';
import CinemaListSkeleton from './skeleton';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import CinemaCard from '@/entities/cinema/ui/CinemaCard/CinemaCard';
import { observer } from 'mobx-react-lite';
import { authStore } from '@/entities/auth/model/auth.store';
import type { FavoriteFilm } from '@/entities/favorites/types/favorites.types';
import useFilmsWithFavorites from '@/entities/cinema/model/useFilmsWithFavorites';
import useToggleFavorite from '@/features/favorites/hooks/useToggleFavorite';
import { useRouter } from 'next/navigation';
import { useUpdateQuery } from '@/entities/cinema/hooks/useUpdateQueryString';
import { debounce } from 'lodash';
import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';

type CinemaListProps = {
  queryFilms: UseInfiniteQueryResult<TransformedData<Film>>;
  queryFavorites?: UseQueryResult<TransformedData<FavoriteFilm>, Error>;
};

const CinemaList = observer(({ queryFilms, queryFavorites }: CinemaListProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const isAuthenticated = authStore.isAuthenticated;
  const updateQuery = useUpdateQuery();

  const {
    data: films,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    hasNextPage,
  } = queryFilms;

  const { data: favorites } = queryFavorites ?? {};

  const filmsWithFavorite = useFilmsWithFavorites({ films, favorites, isAuthenticated });

  const toggleFavorite = useToggleFavorite({ isAuthenticated });

  const debouncedUpdatePage = useMemo(
    () =>
      debounce((page: number) => {
        updateQuery({ page: page.toString() });
      }, 350),
    [updateQuery]
  );

  const handleLoadMore = useCallback(async () => {
    if (isFetchingNextPage || !hasNextPage || !films) return;

    const totalFetched = films.items.length;
    const calculatedPage = Math.ceil(totalFetched / DEFAULT_PAGE_SIZE);

    const currentPage = calculatedPage;
    const nextPage = calculatedPage + 1;

    console.log('curPage: ', currentPage);
    console.log('nextPage: ', nextPage);
    try {
      await fetchNextPage?.();
      debouncedUpdatePage(nextPage);
    } catch (err) {
      console.error('Ошибка подгрузки страницы', err);
    }
  }, [films, fetchNextPage, isFetchingNextPage, hasNextPage, debouncedUpdatePage]);

  useInfiniteScroll({
    targetRef: observerRef,
    enabled: !isLoading,
    hasNextPage: hasNextPage,
    isFetching: isFetchingNextPage,
    // onLoadMore: fetchNextPage,
    onLoadMore: handleLoadMore,
  });

  const openDetail = (documentId: string) => {
    router.push(routes.cinemaDetails.create(documentId));
  };

  if (isLoading) return <CinemaListSkeleton />;

  return (
    <>
      <div className={s.sectionHeader}>
        <Text tag="h2" weight="bold">
          Все фильмы
        </Text>
        <Text color="accent">{films?.pagination?.total ?? '0'}</Text>
      </div>

      {(isError || !films?.items) && <Text color="accent">{isError}</Text>}

      {films?.pagination?.total === 0 && <Text>Фильмы не найдены :(</Text>}
      <div className={s.filmsGrid}>
        {filmsWithFavorite &&
          filmsWithFavorite.map((item) => (
            <CinemaCard
              key={item.documentId}
              film={item}
              onOpenDetail={openDetail}
              onToggleFavorite={toggleFavorite}
            />
          ))}
      </div>

      {hasNextPage && (
        <div ref={observerRef} className={s.observer}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </>
  );
});

export default CinemaList;
