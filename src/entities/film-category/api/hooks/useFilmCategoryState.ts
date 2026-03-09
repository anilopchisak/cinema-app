import { useGetAllInfinite } from '@/shared/api/query/useGetAllInfinite';
import { FILM_CATEGORY_ENDPOINTS } from '../film-category.endpoints';
import filmCategoryApi from '..';

const DEFAULT_PARAMS = {};

const useFimCategoryState = (options: any) => {
  return useGetAllInfinite({
    queryKey: [FILM_CATEGORY_ENDPOINTS.filmCategory],
    service: filmCategoryApi,
    params: DEFAULT_PARAMS,
    options: options,
  });
};

export default useFimCategoryState;
