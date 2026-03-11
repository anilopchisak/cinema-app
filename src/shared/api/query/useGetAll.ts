import { useQuery, type QueryKey } from '@tanstack/react-query';
import type { ApiService } from '../service/api-service.types';
import type { ResponseData } from '../api.types';
import type { TransformedData } from './useGetAllInfinite';

interface QueryProps<TEntity, TParams = unknown> {
  queryKey: QueryKey;
  service: ApiService<TEntity, TParams>;
  params?: TParams;
  options?: any;
}

export const useGetAll = <TEntity, TParams = unknown>(config: QueryProps<TEntity, TParams>) => {
  const { queryKey, service, params, options } = config;
  const key = params ? [...queryKey, params] : queryKey;

  return useQuery<ResponseData<TEntity[]>, Error, TransformedData<TEntity>>({
    queryKey: key,
    queryFn: ({ signal }) => service.getAll(signal, params),
    select: (response) => {
      let items: TEntity[] = [];
      if (Array.isArray(response)) {
        items = response;
      } else if (response?.data && Array.isArray(response.data)) {
        items = response.data;
      }
      const pagination = response?.meta?.pagination ?? null;

      return {
        items,
        pagination,
      };
    },
    ...options,
  });
};
