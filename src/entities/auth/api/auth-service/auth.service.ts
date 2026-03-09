import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "./auth-service.types";
import { STRAPI_URL, getAuthHeaders } from "@/shared/api/helpers";

const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await fetch(`${STRAPI_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Register request failed");
    }

    return response.json();
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await fetch(`${STRAPI_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Login request failed");
    }

    return response.json();
  },
};

export default authService;
