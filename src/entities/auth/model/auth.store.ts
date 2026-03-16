import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';

/** MobX store для управления состоянием аутентификации (токен, флаг инициализации) */
class AuthStore {
  /** JWT токен пользователя (null, если не авторизован) */
  token: string | null = null;
  /** Флаг, указывающий, была ли выполнена инициализация стора */
  isInitialized = false;

  constructor() {
    makeAutoObservable(this);
  }

  /** Геттер: true, если пользователь авторизован (токен существует) */
  get isAuthenticated() {
    return Boolean(this.token);
  }

  /** Инициализация стора: читает токен из куки и устанавливает isInitialized = true */
  initialize() {
    const token = Cookies.get('auth_token');

    runInAction(() => {
      this.token = token || null;
      this.isInitialized = true;
    });
  }

  /**
   * Вход в систему: сохраняет токен в сторе и куки.
   * @param token - JWT токен, полученный после успешной аутентификации
   */
  login(token: string) {
    runInAction(() => {
      this.token = token;
      Cookies.set('auth_token', token, { expires: 7, path: '/' });
    });
  }

  /** Выход из системы: очищает токен в сторе и удаляет куку */
  logout() {
    runInAction(() => {
      this.token = null;
      Cookies.remove('auth_token', { path: '/' });
    });
  }
}

export const authStore = new AuthStore();
