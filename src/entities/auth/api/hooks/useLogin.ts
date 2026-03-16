import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginPayload } from '@/entities/auth/api/auth-service/auth-service.types';
import authService from '@/entities/auth/api/auth-service';
import { authStore } from '@/entities/auth/model/auth.store';

/**
 * Хук для выполнения входа в систему.
 * Использует мутацию React Query для вызова authService.login.
 * При успехе сохраняет JWT в сторе и инвалидирует запросы пользователя.
 * @returns Объект мутации (mutateAsync, isLoading, isSuccess и т.д.)
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      authStore.login(data.jwt);
      // Инвалидируем запросы, связанные с пользователем, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};
