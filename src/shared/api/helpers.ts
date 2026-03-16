import qs from 'qs';

/** Базовый URL Strapi из переменных окружения */
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
/** Полный URL для API Strapi (добавляем /api) */
export const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
/** Имя cookie, в котором хранится токен аутентификации */
const AUTH_COOKIE_NAME = 'auth_token';

/**
 * Получает токен аутентификации из cookie.
 * Работает только на клиенте (проверяет наличие document).
 * @returns Строка с токеном или null, если токен не найден или код выполняется на сервере
 */
const getToken = (): string | null => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${AUTH_COOKIE_NAME.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
};

/**
 * Возвращает заголовки для авторизованных запросов к API.
 * Если токен отсутствует или код выполняется на сервере, возвращает пустой объект.
 * @returns Объект с заголовком Authorization (Bearer токен) или пустой объект
 */
export const getAuthHeaders = (): HeadersInit => {
  if (typeof window === 'undefined') return {};

  const token = getToken();

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Строит строку запроса из объекта параметров, используя qs.
 * @param params - объект параметров для преобразования в query string
 * @returns Строка запроса (начинается с '?' если есть параметры, иначе пустая строка)
 */
export const buildQueryString = (params?: Record<string, unknown>) => {
  if (!params) return '';

  return qs.stringify(params, {
    encodeValuesOnly: true,
  });
};
