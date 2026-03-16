import { useState } from 'react';
import { useLogin } from '@/entities/auth/api/hooks/useLogin';
import { useRegister } from '@/entities/auth/api/hooks/useRegister';
import { LoginFormValues, RegisterFormValues } from '@/features/auth/types/auth-form.types';
import {
  DEFAULT_LOGIN_ERROR,
  DEFAULT_REGISTER_ERROR,
  ERROR_MESSAGE_LOGIN,
  ERROR_MESSAGE_REGISTER,
} from '@/shared/consts/api.consts';
import { ApiError } from '@/shared/api/api.types';
import { message } from '@/shared/ui/Message';

/**
 * Хук, управляющий логикой формы аутентификации (вход/регистрация).
 * Обрабатывает отправку данных, состояния загрузки и ошибки.
 * @param mode - режим формы: 'login' или 'register'
 * @returns Объект с состоянием формы и обработчиками
 */
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

  /** Возвращает сообщение об ошибке на основе статуса HTTP
   * или дефолтное для текущего режима */
  const findError = (status?: number) => {
    if (!isLogin) {
      if (status && ERROR_MESSAGE_REGISTER[status]) {
        return ERROR_MESSAGE_REGISTER[status];
      }
      return DEFAULT_REGISTER_ERROR;
    } else {
      if (status && ERROR_MESSAGE_LOGIN[status]) {
        return ERROR_MESSAGE_LOGIN[status];
      }
      return DEFAULT_LOGIN_ERROR;
    }
  };

  /** Обработчик отправки формы: вызывает соответствующий мутационный хук */
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
      message({ type: 'error', title: findError(apiError.status) });
      setError(findError(apiError.status));
    }
  };

  /** Сбрасывает локальную ошибку */
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
