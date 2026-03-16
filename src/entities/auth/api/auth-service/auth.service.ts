import type { AuthResponse, LoginPayload, RegisterPayload } from './auth-service.types';
import { STRAPI_URL, getAuthHeaders } from '@/shared/api/helpers';

/** Сервис для работы с аутентификацией (регистрация, вход) */
const authService = {
  /**
   * Регистрация нового пользователя
   * @param payload - данные для регистрации (username, email, password)
   * @returns Promise с объектом AuthResponse, содержащим jwt и данные пользователя
   * @throws { status: number, message: string } в случае ошибки
   */
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

  /**
   * Вход в систему
   * @param payload - данные для входа (identifier, password)
   * @returns Promise с объектом AuthResponse, содержащим jwt и данные пользователя
   * @throws { status: number, message: string } в случае ошибки
   */
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
