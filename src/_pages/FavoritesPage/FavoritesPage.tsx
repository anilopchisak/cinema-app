'use client';

import { useRouter } from 'next/navigation';
import Text from '@/shared/ui/Text';
import useFavoritesState from '@/entities/favorites/api/hooks/useFavoritesState';
import CinemaCard from '@/entities/cinema/ui/CinemaCard/CinemaCard';
import { routes } from '@/shared/config/routes';
import useToggleFavorite from '@/features/favorites/hooks/useToggleFavorite';
import s from '@/widgets/cinema/CinemaList/CinemaList.module.scss';
import { useMemo } from 'react';
import CinemaListSkeleton from '@/widgets/cinema/CinemaList/skeleton';
import { favoritesMapper } from '@/entities/favorites/lib/favorites.mapper';
import Transition from '@/shared/ui/Transition';

/** Компонент для отображения списка избранных фильмов */
const FavoritesContent = () => {
  const router = useRouter();

  /** Запрос списка избранного */
  const { data, isError, isLoading } = useFavoritesState({ isAuthenticated: true });

  /** Хук для переключения статуса избранного */
  const toggleFavorite = useToggleFavorite({ isAuthenticated: true });

  /** Преобразуем данные избранного в формат FilmWithFavorite с помощью мемоизации */
  const favorites = useMemo(() => favoritesMapper(data), [data]);

  /** Переход на страницу деталей фильма */
  const openDetail = (documentId: string) => {
    router.push(routes.cinemaDetails.create(documentId));
  };

  if (isError) return <Text color="accent">{String(isError)}</Text>;
  if (!isLoading && favorites?.length === 0) return <Text>Добавьте фильмы в избранное!</Text>;
  if (isLoading) return <CinemaListSkeleton />;

  return (
    <>
      <div className={s.sectionHeader}>
        <Text tag="h2" weight="bold">
          Все фильмы
        </Text>

        <Text color="accent">{favorites?.length ?? '0'}</Text>
      </div>

      <Transition>
        {!isLoading && (
          <div className={s.filmsGrid}>
            {favorites?.length > 0 &&
              favorites.map((item) => (
                <CinemaCard
                  key={item.documentId}
                  film={item}
                  onOpenDetail={openDetail}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
          </div>
        )}
      </Transition>
    </>
  );
};

export default FavoritesContent;
