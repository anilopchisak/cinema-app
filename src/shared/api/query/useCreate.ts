import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiService } from '../service/api-service.types';
import type { ResponseData } from '../api.types';

export interface CreateQueryProps<TEntity, TParams = unknown> {
  service: ApiService<TEntity, TParams>;
  options?: any;
  invalidateQueries?: unknown[];
}

export const useCreate = <TEntity, TData, TParams = unknown>({
  service,
  options,
  invalidateQueries,
}: CreateQueryProps<TEntity, TParams>) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData<TEntity>, Error, TData>({
    mutationFn: (data) => {
      return service.create(data);
    },
    onSuccess: async (data, variables, context) => {
      if (invalidateQueries) {
        await queryClient.invalidateQueries({ queryKey: invalidateQueries });
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
