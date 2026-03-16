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
import { useTranslation } from 'react-i18next';

type Props = {
  /** Режим формы: 'login' для входа, 'register' для регистрации */
  mode: 'login' | 'register';
  /** Колбэк отправки формы с данными */
  onSubmit: (data: LoginFormValues | RegisterFormValues) => void;
  /** Флаг загрузки (дизейблит кнопку и показывает спиннер) */
  isLoading?: boolean;
  /** Флаг ошибки сервера (чтобы добавить пробел для отступа под сообщение) */
  isError?: boolean;
  /** Колбэк при изменении любого поля (используется для сброса ошибки сервера) */
  onFieldChange?: () => void;
};

/** Форма аутентификации (вход/регистрация) с валидацией через react-hook-form + zod */
export default function AuthForm({ mode, onSubmit, isLoading, isError, onFieldChange }: Props) {
  const isLogin = mode === 'login';
  const { t } = useTranslation('common');

  /** Выбор схемы валидации в зависимости от режима (мемоизация для избежания лишних ререндеров) */
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

  /** Сброс формы при переключении режима (логин/регистрация) */
  useEffect(() => {
    reset({
      login: '',
      email: '',
      password: '',
    });
  }, [mode, reset]);

  /** Обёртка над переданным onSubmit, чтобы всегда передавать правильную структуру данных */
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
            placeholder={t('auth.login')}
            showErrorMessage={true}
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
              placeholder="Email"
              showErrorMessage={true}
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
            placeholder="Password"
            type="password"
            showErrorMessage={true}
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
          {isLogin ? t('auth.login') : t('auth.register')}
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
