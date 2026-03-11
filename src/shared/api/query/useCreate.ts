import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiService } from '../service/api-service.types';
import type { ResponseData } from '../api.types';
import type { QueryKey, UseMutationOptions } from '@tanstack/react-query';

export interface UseCreateProps<TEntity, TData = unknown, TParams = unknown> {
  service: ApiService<TEntity, TParams>;
  options?: Omit<UseMutationOptions<ResponseData<TEntity>, Error, TData>, 'mutationFn'>;
  invalidateQueries?: QueryKey;
}

export const useCreate = <TEntity, TData, TParams = unknown>({
  service,
  options,
  invalidateQueries,
}: UseCreateProps<TEntity, TData, TParams>) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData<TEntity>, Error, TData>({
    mutationFn: (data) => {
      return service.create(data);
    },
    ...options,
    onSuccess: async (data, variables, onMutateResult, context) => {
      if (invalidateQueries) {
        await queryClient.invalidateQueries({ queryKey: invalidateQueries });
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables, onMutateResult, context);
      }
    },
  });
};
