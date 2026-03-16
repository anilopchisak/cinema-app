import z from 'zod';
import { loginSchema, registerSchema } from '../zod/auth.schema';

/** Тип данных формы входа, выведенный из схемы loginSchema */
export type LoginFormValues = z.infer<typeof loginSchema>;
/** Тип данных формы регистрации, выведенный из схемы registerSchema */
export type RegisterFormValues = z.infer<typeof registerSchema>;
