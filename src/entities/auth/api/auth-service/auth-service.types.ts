/** Модель пользователя */
export interface User {
  id: number;
  username: string;
  email: string;
}

/** Ответ сервера при аутентификации */
export interface AuthResponse {
  jwt: string;
  user: User;
}

/** Данные для регистрации нового пользователя */
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

/** Данные для входа в систему */
export interface LoginPayload {
  identifier: string;
  password: string;
}
