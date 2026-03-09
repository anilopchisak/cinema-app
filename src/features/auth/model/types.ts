export interface ApiError {
  response?: {
    data?: {
      error?: {
        name?: string;
      };
    };
  };
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "response" in error;
}
