import { ApiError } from 'next/dist/server/api-utils';
import type { AuthResponse, LoginPayload, RegisterPayload } from './auth-service.types';
import { STRAPI_URL, getAuthHeaders } from '@/shared/api/helpers';

const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await fetch(`${STRAPI_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.error?.message,
      };
    }

    return data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await fetch(`${STRAPI_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.error?.message,
      };
    }

    return data;
  },
};

export default authService;
