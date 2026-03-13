import { useGetAll } from '@/shared/api/query/useGetAll';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';
import cinemaApi from '../cinema.api';
import { Film, FilmParams } from '../../types/cinema.types';

export const useAllCinemaState = (params?: FilmParams) => {
  return useGetAll<Film, FilmParams>({
    queryKey: [CINEMA_ENDPOINTS.cinema],
    service: cinemaApi,
    params: { ...params },
  });
};
