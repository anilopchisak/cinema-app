import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "js-cookie";

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
    const token = Cookies.get("auth_token");

    runInAction(() => {
      this.token = token || null;
      this.isInitialized = true;
    });
  }

  login(token: string) {
    runInAction(() => {
      this.token = token;
      Cookies.set("auth_token", token, { expires: 7, path: "/" });
    });
  }

  logout() {
    runInAction(() => {
      this.token = null;
      Cookies.remove("auth_token", { path: "/" });
    });
  }
}

export const authStore = new AuthStore();
