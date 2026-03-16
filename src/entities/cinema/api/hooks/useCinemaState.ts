import cinemaApi from '@/entities/cinema/api';
import { useGetAllInfinite } from '@/shared/api/query/useGetAllInfinite';
import { CINEMA_ENDPOINTS } from '@/entities/cinema/api/cinema.endpoints';
import { FilmParams } from '@/entities/cinema/types/cinema.types';

/**
 * Хук для получения бесконечного списка фильмов с поддержкой пагинации и фильтрации.
 * Основан на useGetAllInfinite с предустановленным сервисом cinemaApi.
 * @param params - параметры фильтрации (категория, год, сортировка, поиск и т.д.)
 * @param initialPage - номер начальной страницы (по умолчанию 1)
 * @returns Результат бесконечного запроса (данные, функция подгрузки, состояние загрузки и т.д.)
 */
const useCinemaState = (params?: FilmParams, initialPage: number = 1) => {
  return useGetAllInfinite({
    queryKey: [CINEMA_ENDPOINTS.cinema],
    service: cinemaApi,
    params: { ...params },
    initialPageCount: initialPage,
  });
};

export default useCinemaState;
