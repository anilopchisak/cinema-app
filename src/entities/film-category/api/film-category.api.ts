import apiService from '@/shared/api/service';
import { FILM_CATEGORY_ENDPOINTS } from './film-category.endpoints';
import type { FilmCategory } from '../types/film-category.types';

/** Сервис для выполнения запросов к API категорий фильмов.
 * Типизирован для работы с FilmCategory и параметрами unknown (параметры не требуются).
 * Использует базовый эндпоинт FILM_CATEGORY_ENDPOINTS.filmCategory с revalidate = 3600 секунд.
 */
const filmCategoryApi = apiService<FilmCategory, unknown>(FILM_CATEGORY_ENDPOINTS.filmCategory, {
  revalidate: 3600,
});

export default filmCategoryApi;
