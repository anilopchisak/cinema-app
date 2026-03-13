import type { ResponseData } from '@/shared/api/api.types';

export interface ApiConfig {
  revalidate?: number | false;
  tags?: string[];
}

export interface ApiService<TEntity, TParams> {
  getOne: (
    signal: AbortSignal,
    documentId: string,
    params?: TParams,
    config?: ApiConfig
  ) => Promise<ResponseData<TEntity>>;

  getAll: (
    signal: AbortSignal,
    params?: TParams,
    config?: ApiConfig
  ) => Promise<ResponseData<TEntity[]>>;

  create: <TData>(data: TData) => Promise<ResponseData<TEntity>>;

  remove: <TData>(data: TData) => Promise<ResponseData<TEntity>>;
}
