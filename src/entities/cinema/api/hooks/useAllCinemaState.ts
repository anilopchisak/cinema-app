import { useGetAll } from '@/shared/api/query/useGetAll';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';
import cinemaApi from '../cinema.api';
import { Film, FilmParams } from '../../types/cinema.types';

/**
 * Хук для получения списка всех фильмов с поддержкой пагинации и фильтрации.
 * Использует обобщённый хук useGetAll с предустановленным сервисом cinemaApi.
 * @param params - параметры запроса (страница, фильтры, сортировка)
 * @returns Результат запроса (данные, состояние загрузки, ошибка и т.д.)
 */
export const useAllCinemaState = (params?: FilmParams) => {
  return useGetAll<Film, FilmParams>({
    queryKey: [CINEMA_ENDPOINTS.cinema],
    service: cinemaApi,
    params: { ...params },
  });
};
