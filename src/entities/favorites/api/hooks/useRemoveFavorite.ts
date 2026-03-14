import { useRemove } from '@/shared/api/query/useRemove';
import favoritesApi from '../favorites.api';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';
import { message } from '@/shared/ui/Message/message';

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
