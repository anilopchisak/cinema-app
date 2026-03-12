import type { FilmParams } from '@/entities/cinema/types/cinema.types';
import apiService from '@/shared/api/service';
import { FAVORITES_ENDPOINTS } from './favorites.endpoints';
import type { FavoriteFilm } from '@/entities/favorites/types/favorites.types';

const favoritesApi = apiService<FavoriteFilm, FilmParams>(FAVORITES_ENDPOINTS.base, { revalidate: 300 });

export default favoritesApi;
