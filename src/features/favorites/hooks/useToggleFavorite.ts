'use client';

import useAddFavorite from '@/entities/favorites/api/hooks/useAddFavorite';
import useRemoveFavorite from '@/entities/favorites/api/hooks/useRemoveFavorite';
import React, { useCallback, useRef } from 'react';
import { message } from '@/shared/ui/Message/message';

/**
 * Хук для переключения фильма в избранное и обратно.
 * Использует мутации добавления/удаления и защиту от двойных кликов через Set в ref.
 * @param params.isAuthenticated - флаг авторизации пользователя
 * @returns Функция toggleFavorite, которую можно вызвать с событием, id фильма и текущим статусом избранного
 */
const useToggleFavorite = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  /** Множество id фильмов, для которых уже выполняется запрос (предотвращает повторные вызовы) */
  const processingIds = useRef<Set<string | number>>(new Set());

  const toggleFavorite = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement>,
      filmId: number | string,
      isFavorite?: boolean
    ) => {
      e.stopPropagation();

      if (!isAuthenticated) {
        message({ type: 'info', title: 'Войдите в аккаунт, чтобы добавить в избранное' });
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
    [addFavorite, removeFavorite, isAuthenticated]
  );

  return toggleFavorite;
};

export default useToggleFavorite;
