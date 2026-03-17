import { z } from 'zod';

/** Схема валидации для формы входа */
export const loginSchema = z.object({
  login: z
    .string()
    .min(1, { message: 'validation.enterLogin' })
    .min(3, { message: 'validation.loginMin' }),
  password: z
    .string()
    .min(1, { message: 'validation.enterPassword' })
    .min(6, { message: 'validation.passwordMin' }),
});

export const registerSchema = loginSchema.extend({
  email: z
    .email({ message: 'validation.invalidEmail' })
    .min(1, { message: 'validation.enterEmail' }),
});
