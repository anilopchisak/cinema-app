export const routes = {
  root: {
    mask: "/",
    create: () => "/",
  },
  cinema: {
    mask: "/cinema",
    create: () => "/cinema",
  },
  cinemaDetails: {
    mask: "cinema/:documentId",
    create: (documentId: string) => `/cinema/${documentId}`,
  },
  login: {
    mask: "login",
    create: () => "/login",
  },
  register: {
    mask: "register",
    create: () => "/register",
  },
  favorites: {
    mask: "favorites",
    create: () => "/favorites",
  },
  account: {
    mask: "account",
    create: () => "/account",
  },
};
