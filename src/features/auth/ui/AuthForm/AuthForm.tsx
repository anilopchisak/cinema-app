"use client";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import s from "./AuthForm.module.scss";
import type { LoginFormData, RegisterFormData } from "../../auth-form.types";
import Link from "next/link";
import { routes } from "@/shared/config/routes";

type Props = {
  mode: "login" | "register";
  onLogin: (data: LoginFormData) => void;
  onRegister: (data: RegisterFormData) => void;
  isLoading?: boolean;
};

type FormValues = RegisterFormData;

export default function AuthForm({
  mode,
  onLogin,
  onRegister,
  isLoading,
}: Props) {
  const isLogin = mode === "login";

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      login: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      login: "",
      email: "",
      password: "",
    });
  }, [mode, reset]);

  const onSubmit = (values: FormValues) => {
    if (isLogin) {
      const { login, password } = values;
      onLogin({ login, password });
    } else {
      onRegister(values);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="login"
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            value={field.value || ""}
            onChange={field.onChange}
            placeholder="Логин"
            autoFocus
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
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Эл. почта"
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
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            value={field.value || ""}
            onChange={field.onChange}
            placeholder="Пароль"
            type="password"
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
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </Button>

        <Link
          href={isLogin ? routes.register.create() : routes.login.create()}
          className={s.button}
        >
          <Button styleType="outline" className={s.button}>
            {isLogin ? "Нет аккаунта? Регистрация" : "Есть аккаунт? Войти"}
          </Button>
        </Link>
      </div>
    </form>
  );
}
