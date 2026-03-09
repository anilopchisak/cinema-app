export type LoginFormData = {
  login: string;
  password: string;
};

export type RegisterFormData = LoginFormData & {
  email: string;
};
