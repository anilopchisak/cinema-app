'use client';

import useAddFavorite from '@/entities/favorites/api/hooks/useAddFavorite';
import useRemoveFavorite from '@/entities/favorites/api/hooks/useRemoveFavorite';
import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const useToggleFavorite = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const router = useRouter();
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  const processingIds = useRef<Set<string | number>>(new Set());

  const toggleFavorite = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement>,
      filmId: number | string,
      isFavorite?: boolean
    ) => {
      e.stopPropagation();

      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (!filmId) return;
      if (processingIds.current.has(filmId)) return;

      processingIds.current.add(filmId);

      const mutateFn = isFavorite ? removeFavorite : addFavorite;
      mutateFn(
        { film: filmId },
        {
          onSettled: () => {
            processingIds.current.delete(filmId);
          },
        }
      );
    },
    [addFavorite, removeFavorite, isAuthenticated, router]
  );

  return toggleFavorite;
};

export default useToggleFavorite;
