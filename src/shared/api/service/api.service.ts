import type { ResponseData } from '@/shared/api/api.types';
import { STRAPI_URL, getAuthHeaders, buildQueryString } from '@/shared/api/helpers';
import type { ApiService } from './api-service.types';

const apiService = <TEntity, TParams = unknown>(endpoint: string): ApiService<TEntity, TParams> => {
  const getOne = async (
    signal: AbortSignal,
    documentId: string
  ): Promise<ResponseData<TEntity>> => {
    const response = await fetch(`${STRAPI_URL}${endpoint}/${documentId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
      signal,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch entity');
    }

    return response.json();
  };

  const getAll = async (
    signal: AbortSignal,
    params?: TParams
  ): Promise<ResponseData<TEntity[]>> => {
    const query = buildQueryString(params as Record<string, unknown>);

    const response = await fetch(`${STRAPI_URL}${endpoint}?${query}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
      signal,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch entities');
    }

    const data = await response.json();
    return data;
  };

  const create = async <TData>(data: TData): Promise<ResponseData<TEntity>> => {
    const response = await fetch(`${STRAPI_URL}${endpoint}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Create request failed');
    }

    return response.json();
  };

  const remove = async <TData>(data: TData): Promise<ResponseData<TEntity>> => {
    const response = await fetch(`${STRAPI_URL}${endpoint}/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Remove request failed');
    }

    return response.json();
  };

  return {
    getOne,
    getAll,
    create,
    remove,
  };
};

export default apiService;
