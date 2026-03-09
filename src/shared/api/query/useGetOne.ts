import { useQuery, type QueryKey } from '@tanstack/react-query';
import type { ApiService } from '../service/api-service.types';
import type { ResponseData } from '../api.types';

export const useGetOne = <TEntity, TParams>(
  documentId: string | null,
  queryKey: QueryKey,
  service: ApiService<TEntity, TParams>
) => {
  const query = useQuery<ResponseData<TEntity>, Error, TEntity>({
    queryKey: [...queryKey, documentId],
    queryFn: ({ signal }) => {
      if (!documentId) throw new Error('Попытка запроса эксемпляра сущности с пустым id');
      return service.getOne(signal, documentId);
    },
    enabled: !!documentId,
    select: ({ data }) => data,
  });

  return query;
};
