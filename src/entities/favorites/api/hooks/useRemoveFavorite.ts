import { useRemove } from '@/shared/api/query/useRemove';
import favoritesApi from '../favorites.api';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';
import { message } from '@/shared/ui/Message/message';

/** Хук для удаления фильма из избранного.
 * Использует мутацию useRemove с предустановленным сервисом favoritesApi.
 * При успехе показывает уведомление "Удалено!" и инвалидирует запросы списка избранного.
 * При ошибке показывает уведомление об ошибке.
 * @returns Объект мутации (mutate, isLoading и т.д.)
 */
const useRemoveFavorite = () => {
  return useRemove({
    service: favoritesApi,
    invalidateQueries: [FAVORITES_ENDPOINTS.base],
    options: {
      onSuccess: () => message({ type: 'success', title: 'Удалено!' }),
      onError: () => message({ type: 'error', title: 'Произошла ошибка. Попробуйте позже.' }),
    },
  });
};

export default useRemoveFavorite;
