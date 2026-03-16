'use client';

import type { UseInfiniteQueryResult, UseQueryResult } from '@tanstack/react-query';
import s from './CinemaList.module.scss';
import Text from '@/shared/ui/Text';
import { useCallback, useRef } from 'react';
import { routes } from '@/shared/config/routes';
import Loader from '@/shared/ui/Loader';
import type { Film } from '@/entities/cinema/types/cinema.types';
import type { TransformedData } from '@/shared/api/query/useGetAllInfinite';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import CinemaCard from '@/entities/cinema/ui/CinemaCard/CinemaCard';
import { observer } from 'mobx-react-lite';
import { authStore } from '@/entities/auth/model/auth.store';
import type { FavoriteFilm } from '@/entities/favorites/types/favorites.types';
import useFilmsWithFavorites from '@/entities/cinema/model/useFilmsWithFavorites';
import useToggleFavorite from '@/features/favorites/hooks/useToggleFavorite';
import { useRouter } from 'next/navigation';
import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';
import { motion } from 'framer-motion';
import { useUpdatePageInQueryClient } from '@/entities/cinema/hooks/useUpdatePageInQueryClient';

type CinemaListProps = {
  queryFilms: UseInfiniteQueryResult<TransformedData<Film>>;
  queryFavorites?: UseQueryResult<TransformedData<FavoriteFilm>, Error>;
};

/** Компонент для отображения сетки фильмов
 * с поддержкой бесконечной подгрузки, избранного и анимаций */
const CinemaList = observer(({ queryFilms, queryFavorites }: CinemaListProps) => {
  /** Реф для Intersection Observer */
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const isAuthenticated = authStore.isAuthenticated;

  /** Хук для обновления текущей страницы в кэше React Query после подгрузки */
  const updatePageInQueryClient = useUpdatePageInQueryClient();

  const {
    data: films,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    hasNextPage,
  } = queryFilms;

  const { data: favorites } = queryFavorites ?? {};

  /** Объединяем фильмы с информацией о том, находятся ли они в избранном */
  const filmsWithFavorite = useFilmsWithFavorites({ films, favorites, isAuthenticated });

  /** Хук для переключения статуса избранного */
  const toggleFavorite = useToggleFavorite({ isAuthenticated });

  /** Обработчик подгрузки следующей страницы с обновлением страницы */
  const handleLoadMore = useCallback(async () => {
    if (isFetchingNextPage || !hasNextPage || !films) return;

    // Вычисляем номер следующей страницы на основе уже загруженных элементов
    const totalFetched = films.items.length;
    const currentPage = Math.ceil(totalFetched / DEFAULT_PAGE_SIZE);
    const nextPage = currentPage + 1;
    try {
      await fetchNextPage?.();
      // Сохраняем номер страницы
      updatePageInQueryClient(nextPage);
    } catch (err) {
      throw new Error(`Ошибка подгрузки фильмов: ${err}`);
    }
  }, [films, fetchNextPage, isFetchingNextPage, hasNextPage, updatePageInQueryClient]);

  /** Настройка бесконечного скролла на основе Intersection Observer */
  useInfiniteScroll({
    targetRef: observerRef,
    enabled: !isLoading,
    hasNextPage: hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: handleLoadMore,
  });

  /** Переход на страницу детального просмотра фильма */
  const openDetail = (documentId: string) => {
    router.push(routes.cinemaDetails.create(documentId), { scroll: true });
  };

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
            <motion.div
              key={item.documentId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <CinemaCard
                key={item.documentId}
                film={item}
                onOpenDetail={openDetail}
                onToggleFavorite={toggleFavorite}
              />
            </motion.div>
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
