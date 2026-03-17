import { useCreate } from '@/shared/api/query/useCreate';
import favoritesApi from '@/entities/favorites/api/favorites.api';
import { FAVORITES_ENDPOINTS } from '@/entities/favorites/api/favorites.endpoints';
import { message } from '@/shared/ui/Message';
import { useTranslation } from 'react-i18next';

/** Хук для добавления фильма в избранное.
 * Использует мутацию useCreate с предустановленным сервисом favoritesApi.
 * При успехе показывает уведомление "Добавлено!" и инвалидирует запросы списка избранного.
 * При ошибке показывает уведомление об ошибке.
 * @returns Объект мутации (mutate, isLoading и т.д.)
 */
const useAddFavorite = () => {
  const { t } = useTranslation('common');
  return useCreate({
    service: favoritesApi,
    invalidateQueries: [FAVORITES_ENDPOINTS.base],
    options: {
      onSuccess: () => message({ type: 'success', title: t('toast.added') }),
      onError: () => message({ type: 'error', title: t('toast.errorGeneric') }),
    },
  });
};

export default useAddFavorite;
