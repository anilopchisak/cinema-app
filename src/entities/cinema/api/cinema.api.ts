import apiService from '@/shared/api/service/';
import { type Film, type FilmParams } from '@/entities/cinema/types/cinema.types';
import { CINEMA_ENDPOINTS } from '@/entities/cinema/api/cinema.endpoints';

/** Сервис для выполнения запросов к API фильмов.
 * Настроен на эндпоинт CINEMA_ENDPOINTS.cinema с revalidate = 300 секунд.
 * Предоставляет типизированные методы (getAll, getOne, create, delete).
 */
const cinemaApi = apiService<Film, FilmParams>(CINEMA_ENDPOINTS.cinema, { revalidate: 300 });

export default cinemaApi;
