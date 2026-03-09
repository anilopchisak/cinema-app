import qs from "qs";

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
export const STRAPI_URL = `${STRAPI_BASE_URL}/api`;

const AUTH_COOKIE_NAME = "auth_token";

const getToken = (): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(
      `(?:^|; )${AUTH_COOKIE_NAME.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}=([^;]*)`,
    ),
  );

  return match ? decodeURIComponent(match[1]) : null;
};

export const getAuthHeaders = (): HeadersInit => {
  if (typeof window === "undefined") return {};

  const token = getToken();

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const buildQueryString = (params?: Record<string, unknown>) => {
  if (!params) return "";

  return qs.stringify(params, {
    encodeValuesOnly: true,
  });
};
