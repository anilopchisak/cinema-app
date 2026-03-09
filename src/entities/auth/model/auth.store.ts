import { makeAutoObservable, runInAction } from 'mobx';

class AuthStore {
  token: string | null = null;
  isInitialized = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return Boolean(this.token);
  }

  initialize() {
    const token = localStorage.getItem('token');

    runInAction(() => {
      this.token = token;
      this.isInitialized = true;
    });
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
  }
}

export const authStore = new AuthStore();
