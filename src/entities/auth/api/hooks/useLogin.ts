import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginPayload } from '@/entities/auth/api/auth-service/auth-service.types';
import authService from '@/entities/auth/api/auth-service';
import { authStore } from '@/entities/auth/model/auth.store';

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
