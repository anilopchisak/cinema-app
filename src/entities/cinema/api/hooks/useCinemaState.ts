import cinemaApi from '..';
import { useGetAllInfinite } from '@/shared/api/query/useGetAllInfinite';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';
import { FilmParams } from '../../types/cinema.types';

const useCinemaState = (params?: FilmParams, initialPage: number = 1) => {
  return useGetAllInfinite({
    queryKey: [CINEMA_ENDPOINTS.cinema],
    service: cinemaApi,
    params: { ...params },
    initialPageCount: initialPage,
  });
};

export default useCinemaState;
