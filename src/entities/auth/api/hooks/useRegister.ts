import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RegisterPayload } from '@/entities/auth/api/auth-service/auth-service.types';
import authService from '@/entities/auth/api/auth-service';
import { authStore } from '@/entities/auth/model/auth.store';

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      authStore.login(data.jwt);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      throw new Error(`Ошибка регистрации: ${error}`);
    },
  });
};
