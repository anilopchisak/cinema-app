"use client";

import Text from "@/shared/ui/Text";
import s from "./AuthPage.module.scss";
import AuthForm from "@/features/auth/ui/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoginFormData,
  RegisterFormData,
} from "@/features/auth/auth-form.types";

const ERROR_MESSAGE: Record<string, string> = {
  ValidationError: "Неверный логин или пароль.",
  defaultLogin: "Ошибка при авторизации",
  defaultRegister: "Ошибка при регистрации",
};

type Props = {
  mode: "login" | "register";
};

export default function AuthPage({ mode }: { mode: "login" | "register" }) {
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const isLogin = mode === "login";

  const mapError = (errName?: string) => {
    if (errName && ERROR_MESSAGE[errName]) return ERROR_MESSAGE[errName];
    return isLogin ? ERROR_MESSAGE.defaultLogin : ERROR_MESSAGE.defaultRegister;
  };

  const handleSubmit = async (data: LoginFormData | RegisterFormData) => {
    setErrors([]);

    // const validationErrors = isLogin
    //   ? loginDataValidator(data as LoginFormData)
    //   : registerDataValidator(data as RegisterFormData);

    // if (validationErrors.length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    // try {
    //   if (isLogin) {
    //     await loginUser({ identifier: data.login, password: data.password });
    //   } else {
    //     const regData = data as RegisterFormData;
    //     await registerUser({
    //       email: regData.email,
    //       username: regData.login,
    //       password: regData.password,
    //     });
    //   }
    // } catch (err: any) {
    //   setErrors([mapError(err?.response?.data?.error?.name)]);
    // }
  };

  return (
    <div className={s.container}>
      <Text view="title">{mode === "login" ? "Войти" : "Регистрация"}</Text>

      <AuthForm
        mode={mode}
        onLogin={handleSubmit}
        onRegister={handleSubmit}
        // isLoading={isPendingLogin || isPendingRegister}
        isLoading={false}
      />

      {errors.length > 0 && (
        <div className={s.errorsWrapper}>
          {errors.map((err, i) => (
            <Text key={i} view="p-18" color="primary">
              {err}
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}
