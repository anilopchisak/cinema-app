import { useCreate } from '@/shared/api/query/useCreate';
import favoritesApi from '@/entities/favorites/api/favorites.api';
import { FAVORITES_ENDPOINTS } from '@/entities/favorites/api/favorites.endpoints';
import { message } from '@/shared/ui/Message/message';

const useAddFavorite = () => {
  return useCreate({
    service: favoritesApi,
    invalidateQueries: [FAVORITES_ENDPOINTS.base],
    options: {
      onSuccess: () => message({ type: 'success', title: 'Добавлено!' }),
      onError: () => message({ type: 'error', title: 'Произошла ошибка. Попробуйте позже.' }),
    },
  });
};

export default useAddFavorite;
