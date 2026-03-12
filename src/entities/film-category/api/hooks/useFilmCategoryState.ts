import { TransformedData, useGetAllInfinite } from '@/shared/api/query/useGetAllInfinite';
import { FILM_CATEGORY_ENDPOINTS } from '@/entities/film-category/api/film-category.endpoints';
import filmCategoryApi from '@/entities/film-category/api';
import { FilmCategory } from '@/entities/film-category/types/film-category.types';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { ResponseData } from '@/shared/api/api.types';

const DEFAULT_PARAMS = {};

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
