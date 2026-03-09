export const validateLogin = (value: string) => {
  const errors: string[] = [];
  if (!value || value.trim().length < 3) {
    errors.push('Логин должен быть не менее 3 символов');
  }

  return errors;
};

export const validatePassword = (value: string) => {
  const errors: string[] = [];
  if (!value || value.length < 6) {
    errors.push('Пароль должен быть не менее 6 символов');
  }

  return errors;
};

export const validateEmail = (value?: string) => {
  const errors: string[] = [];
  if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
    errors.push('Введите корректный email');
  }

  return errors;
};

export const loginDataValidator = (data: { login: string; password: string }) => {
  return [...validateLogin(data.login), ...validatePassword(data.password)];
};

export const registerDataValidator = (data: {
  login: string;
  password: string;
  email?: string;
}) => {
  const errors: string[] = [];
  if (!data.login || !data.password || !data.email) {
    errors.push('Заполните все поля');
  }

  return [
    ...errors,
    ...validateLogin(data.login),
    ...validatePassword(data.password),
    ...validateEmail(data.email),
  ];
};
