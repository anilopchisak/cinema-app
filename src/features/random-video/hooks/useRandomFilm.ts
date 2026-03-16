import { useAllCinemaState } from '@/entities/cinema/api/hooks/useAllCinemaState';
import { FilmParams } from '@/entities/cinema/types/cinema.types';

/**
 * Хук для получения случайного фильма.
 * Загружает все фильмы (только поля documentId, title, trailerUrl) и предоставляет функцию getRandomFilm,
 * которая возвращает случайный элемент из загруженного списка.
 * @returns Объект с данными, функцией получения случайного фильма и состояниями загрузки/ошибки
 */
export const useRandomFilm = () => {
  const params: FilmParams = {
    fields: ['documentId', 'title', 'trailerUrl'],
  };

  const { data, isLoading, isError } = useAllCinemaState(params);

  const getRandomFilm = () => {
    if (!data?.items?.length) return;
    const randomIndex = Math.floor(Math.random() * data?.items?.length);
    return data.items[randomIndex];
  };

  return {
    data,
    getRandomFilm,
    isLoading,
    isError,
  };
};
