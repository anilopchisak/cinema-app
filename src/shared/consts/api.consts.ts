export const DEFAULT_PAGE_SIZE = 9;

export const ERROR_MESSAGE: Record<number, string> = {
  400: 'Пользователь уже существует.',
  401: 'Неверный логин или пароль.',
  403: 'Доступ запрещён.',
};

export const DEFAULT_LOGIN_ERROR = 'Ошибка авторизации. Попробуйте позже.';
export const DEFAULT_REGISTER_ERROR = 'Ошибка регистрации. Попробуйте позже.';
