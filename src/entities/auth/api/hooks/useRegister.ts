import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RegisterPayload } from '../auth-service/auth-service.types';
import authService from '../auth-service';
import { authStore } from '../../model/auth.store';

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
