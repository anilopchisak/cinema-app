import z from 'zod';
import { loginSchema, registerSchema } from '../zod/auth.schema';

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
