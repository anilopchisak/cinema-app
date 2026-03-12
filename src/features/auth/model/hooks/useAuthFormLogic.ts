import { loginDataValidator, registerDataValidator } from '@/shared/lib/auth-validators';
import { useState } from 'react';
import { useLogin } from '@/entities/auth/api/hooks/useLogin';
import { useRegister } from '@/entities/auth/api/hooks/useRegister';
import { isApiError } from '@/features/auth/model/types';
import { LoginFormData, RegisterFormData } from '@/features/auth/auth-form.types';

const ERROR_MESSAGE: Record<string, string> = {
  ValidationError: 'Неверный логин или пароль.',
  defaultLogin: 'Ошибка при авторизации',
  defaultRegister: 'Ошибка при регистрации',
};

export const useAuthFormLogic = (mode: 'login' | 'register') => {
  const [errors, setErrors] = useState<string[]>([]);
  const isLogin = mode === 'login';

  const {
    mutateAsync: loginUser,
    isPending: isPendingLogin,
    isSuccess: isSuccessLogin,
  } = useLogin();
  const {
    mutateAsync: registerUser,
    isPending: isPendingRegister,
    isSuccess: isSuccessRegister,
  } = useRegister();

  const mapError = (errName?: string) => {
    if (errName && ERROR_MESSAGE[errName]) return ERROR_MESSAGE[errName];
    return isLogin ? ERROR_MESSAGE.defaultLogin : ERROR_MESSAGE.defaultRegister;
  };

  const handleSubmit = async (data: LoginFormData | RegisterFormData) => {
    setErrors([]);

    const validationErrors = isLogin
      ? loginDataValidator(data as LoginFormData)
      : registerDataValidator(data as RegisterFormData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isLogin) {
        await loginUser({ identifier: data.login, password: data.password });
      } else {
        const regData = data as RegisterFormData;
        await registerUser({
          email: regData.email,
          username: regData.login,
          password: regData.password,
        });
      }
    } catch (err: unknown) {
      let errorName: string | undefined;

      if (isApiError(err)) {
        errorName = err.response?.data?.error?.name;
      }

      setErrors([mapError(errorName)]);
    }
  };

  return {
    errors,
    handleSubmit,
    isLoading: isPendingLogin || isPendingRegister,
    isSuccess: isSuccessLogin || isSuccessRegister,
  };
};
