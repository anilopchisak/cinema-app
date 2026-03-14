'use client';

import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import s from './AuthForm.module.scss';
import type { LoginFormValues, RegisterFormValues } from '@/features/auth/types/auth-form.types';
import Link from 'next/link';
import { routes } from '@/shared/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '../../zod/auth.schema';

type Props = {
  mode: 'login' | 'register';
  onSubmit: (data: LoginFormValues | RegisterFormValues) => void;
  isLoading?: boolean;
  isError?: boolean;
  onFieldChange?: () => void;
};

export default function AuthForm({ mode, onSubmit, isLoading, isError, onFieldChange }: Props) {
  const isLogin = mode === 'login';

  const schema = useMemo(() => (isLogin ? loginSchema : registerSchema), [isLogin]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      login: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    reset({
      login: '',
      email: '',
      password: '',
    });
  }, [mode, reset]);

  const submit = (values: LoginFormValues | RegisterFormValues) => {
    if (isLogin) {
      onSubmit({ login: values.login, password: values.password });
    } else {
      onSubmit(values as RegisterFormValues);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="login"
        render={({ field, fieldState }) => (
          <Input
            autoFocus
            value={field.value || ''}
            onChange={(v) => {
              field.onChange(v);
              onFieldChange?.();
            }}
            placeholder="Логин"
            error={fieldState.error?.message || (isError ? ' ' : undefined)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
        )}
      />

      {!isLogin && (
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              value={field.value || ''}
              onChange={(v) => {
                field.onChange(v);
                onFieldChange?.();
              }}
              placeholder="Эл. почта"
              error={fieldState.error?.message || (isError ? ' ' : undefined)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            value={field.value || ''}
            onChange={(v) => {
              field.onChange(v);
              onFieldChange?.();
            }}
            placeholder="Пароль"
            type="password"
            error={fieldState.error?.message || (isError ? ' ' : undefined)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
        )}
      />

      <div className={s.actions}>
        <Button
          className={s.button}
          type="submit"
          disabled={isLoading || isSubmitting}
          loading={isLoading || isSubmitting}
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </Button>

        <Link
          href={isLogin ? routes.register.create() : routes.login.create()}
          className={s.button}
        >
          <Button styleType="outline" className={s.button}>
            {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
          </Button>
        </Link>
      </div>
    </form>
  );
}
