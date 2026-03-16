import { TransformedData, useGetAllInfinite } from '@/shared/api/query/useGetAllInfinite';
import { FILM_CATEGORY_ENDPOINTS } from '@/entities/film-category/api/film-category.endpoints';
import filmCategoryApi from '@/entities/film-category/api';
import { FilmCategory } from '@/entities/film-category/types/film-category.types';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { ResponseData } from '@/shared/api/api.types';

const DEFAULT_PARAMS = {};

/**
 * Хук для получения бесконечного списка категорий фильмов.
 * Использует useGetAllInfinite с предустановленным сервисом filmCategoryApi.
 * @param options - дополнительные опции для React Query (исключая служебные поля, такие как queryKey, queryFn, select и т.д.)
 * @returns Результат бесконечного запроса (данные, функция подгрузки, состояние загрузки и т.д.)
 */
const useFimCategoryState = (
  options?: Omit<
    UseInfiniteQueryOptions<ResponseData<FilmCategory[]>, Error, TransformedData<FilmCategory>>,
    'queryKey' | 'queryFn' | 'select' | 'getNextPageParam' | 'initialPageParam'
  >
) => {
  return useGetAllInfinite<FilmCategory, Record<string, unknown>>({
    queryKey: [FILM_CATEGORY_ENDPOINTS.filmCategory],
    service: filmCategoryApi,
    params: DEFAULT_PARAMS,
    options: options,
  });
};

export default useFimCategoryState;
