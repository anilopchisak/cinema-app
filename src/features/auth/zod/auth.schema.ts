import { z } from 'zod';

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, { message: 'Введите логин' })
    .min(3, { message: 'Логин должен содержать минимум 3 символа' }),
  password: z
    .string()
    .min(1, { message: 'Введите пароль' })
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

export const registerSchema = loginSchema.extend({
  email: z
    .email({ message: 'Неверный формат электронной почты' })
    .min(1, { message: 'Введите эл. почту' }),
});
