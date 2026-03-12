import cinemaApi from '@/entities/cinema/api';
import { useGetAllInfinite } from '@/shared/api/query/useGetAllInfinite';
import { CINEMA_ENDPOINTS } from '@/entities/cinema/api/cinema.endpoints';
import { FilmParams } from '@/entities/cinema/types/cinema.types';

const useCinemaState = (params?: FilmParams, initialPage: number = 1) => {
  return useGetAllInfinite({
    queryKey: [CINEMA_ENDPOINTS.cinema],
    service: cinemaApi,
    params: { ...params },
    initialPageCount: initialPage,
  });
};

export default useCinemaState;
