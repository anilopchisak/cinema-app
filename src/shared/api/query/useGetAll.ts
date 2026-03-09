import { useQuery, type QueryKey } from '@tanstack/react-query';
import type { ApiService } from '../service/api-service.types';
import type { PaginationResponse, ResponseData } from '../api.types';
import type { TransformedData } from './useGetAllInfinite';

interface QueryProps<TEntity, TParams = unknown> {
  queryKey: QueryKey;
  service: ApiService<TEntity, TParams>;
  params?: TParams;
  options?: any;
}

export const useGetAll = <TEntity, TParams = unknown>(config: QueryProps<TEntity, TParams>) => {
  const { queryKey, service, params, options } = config;

  return useQuery<ResponseData<TEntity[]>, Error, TransformedData<TEntity>>({
    queryKey: [...queryKey, params],
    queryFn: ({ signal }) => service.getAll(signal, params),
    select: (response) => {
      const raw: any = response.data;

      if (!Array.isArray(raw)) {
        const pagination = (raw as { meta?: { pagination?: PaginationResponse } }).meta?.pagination;

        return {
          items: raw.data ?? [],
          pagination: pagination ?? null,
        };
      }

      return {
        items: raw as TEntity[],
        pagination: null,
      };
    },
    ...options,
  });
};
