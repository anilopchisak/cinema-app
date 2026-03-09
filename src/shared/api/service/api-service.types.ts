import type { ResponseData } from "@/shared/api/api.types";

export interface ApiServiceConfig {
  endpoint: string;
}

export interface ApiService<TEntity, TParams> {
  getOne: (
    signal: AbortSignal,
    documentId: string,
  ) => Promise<ResponseData<TEntity>>;

  getAll: (
    signal: AbortSignal,
    params?: TParams,
  ) => Promise<ResponseData<TEntity[]>>;

  create: <TData>(data: TData) => Promise<ResponseData<TEntity>>;

  remove: <TData>(data: TData) => Promise<ResponseData<TEntity>>;
}
