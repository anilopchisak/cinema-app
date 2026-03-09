import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiService } from '../service/api-service.types';
import type { ResponseData } from '../api.types';

export interface UseRemoveProps<TEntity, TParams = unknown> {
  service: ApiService<TEntity, TParams>;
  options?: any;
  invalidateQueries?: unknown[];
}

export const useRemove = <TEntity, TData, TParams = unknown>({
  service,
  options,
  invalidateQueries,
}: UseRemoveProps<TEntity, TParams>) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData<TEntity>, Error, TData>({
    mutationFn: (data) => service.remove(data),
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
