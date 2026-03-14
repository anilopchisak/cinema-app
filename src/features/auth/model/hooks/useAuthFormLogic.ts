import { useState } from 'react';
import { useLogin } from '@/entities/auth/api/hooks/useLogin';
import { useRegister } from '@/entities/auth/api/hooks/useRegister';
import { LoginFormValues, RegisterFormValues } from '@/features/auth/types/auth-form.types';
import {
  DEFAULT_LOGIN_ERROR,
  DEFAULT_REGISTER_ERROR,
  ERROR_MESSAGE,
} from '@/shared/consts/api.consts';
import { ApiError } from '@/shared/api/api.types';

export const useAuthFormLogic = (mode: 'login' | 'register') => {
  const [error, setError] = useState<string>('');
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

  const findError = (status?: number) => {
    if (status && ERROR_MESSAGE[status]) {
      return ERROR_MESSAGE[status];
    }
    return isLogin ? DEFAULT_LOGIN_ERROR : DEFAULT_REGISTER_ERROR;
  };

  const handleSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    setError('');

    try {
      if (isLogin) {
        await loginUser({ identifier: data.login, password: data.password });
      } else {
        const regData = data as RegisterFormValues;
        await registerUser({
          email: regData.email,
          username: regData.login,
          password: regData.password,
        });
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(findError(apiError.status));
    }
  };

  const clearError = () => setError('');

  return {
    error,
    handleSubmit,
    isLoading: isPendingLogin || isPendingRegister,
    isSuccess: isSuccessLogin || isSuccessRegister,
    isError: Boolean(error),
    clearError,
  };
};
