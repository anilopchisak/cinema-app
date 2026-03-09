import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginPayload } from '../auth-service/auth-service.types';
import authService from '../auth-service';
import { authStore } from '../../model/auth.store';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      authStore.login(data.jwt);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      throw new Error(`Ошибка авторизации: ${error}`);
    },
  });
};
