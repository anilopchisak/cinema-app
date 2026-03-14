export interface PaginationParams {
  page: number;
  pageSize: number;
  withCount: true;
}

export interface PaginationResponse {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ResponseData<T> {
  data: T;
  meta: {
    pagination: PaginationResponse;
  };
}

export type ApiError = {
  status: number;
  message?: string;
};
