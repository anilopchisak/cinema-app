'use client';

import { useRouter } from 'next/navigation';
import Text from '@/shared/ui/Text';
import useFavoritesState from '@/entities/favorites/api/hooks/useFavoritesState';
import { observer } from 'mobx-react-lite';
import { authStore } from '@/entities/auth/model/auth.store';
import CinemaCard from '@/entities/cinema/ui/CinemaCard/CinemaCard';
import { routes } from '@/shared/config/routes';
import useToggleFavorite from '@/features/favorites/hooks/useToggleFavorite';
import s from '@/widgets/cinema/CinemaList/CinemaList.module.scss';
import { useMemo } from 'react';
import CinemaListSkeleton from '@/widgets/cinema/CinemaList/skeleton';

const FavoritesContent = observer(() => {
  const router = useRouter();
  const isAuthenticated = authStore.isAuthenticated;

  const { data, isError, isLoading } = useFavoritesState();

  const toggleFavorite = useToggleFavorite({ isAuthenticated });

  const favorites = useMemo(() => {
    const result = data?.items?.map((item) => ({
      ...item.film,
      isFavorite: true,
    }));
    return result;
  }, [data]);

  const openDetail = (documentId: string) => {
    router.push(`${routes.cinemaDetails.create(documentId)}?from=favorites`);
  };

  return (
    <div>
      <div className={s.sectionHeader}>
        <Text tag="h1" view="title" weight="bold">
          Избранное
        </Text>

        <Text color="accent">{favorites?.length ?? '0'}</Text>
      </div>

      {(isError || !data?.items) && <Text color="accent">{String(isError)}</Text>}

      {favorites?.length === 0 && <Text>Добавьте фильмы в избранное!</Text>}

      {isLoading && <CinemaListSkeleton />}

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
    </div>
  );
});

export default FavoritesContent;
