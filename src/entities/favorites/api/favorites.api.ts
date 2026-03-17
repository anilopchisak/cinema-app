import type { FilmParams } from '@/entities/cinema/types/cinema.types';
import apiService from '@/shared/api/service';
import { FAVORITES_ENDPOINTS } from './favorites.endpoints';
import type { FavoriteFilm } from '@/entities/favorites/types/favorites.types';

/** Сервис для выполнения CRUD-запросов к API избранного.
 * Типизирован для работы с FavoriteFilm и параметрами FilmParams.
 * Использует базовый эндпоинт FAVORITES_ENDPOINTS.base с revalidate = 300 секунд.
 */
const favoritesApi = apiService<FavoriteFilm, FilmParams>(FAVORITES_ENDPOINTS.base, {
  revalidate: 300,
});

export default favoritesApi;
