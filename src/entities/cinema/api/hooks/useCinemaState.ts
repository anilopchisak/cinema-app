import cinemaApi from '..';
import { useGetAllInfinite } from '@/shared/api/query/useGetAllInfinite';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';

const useCinemaState = (params?: any, initialPage: number = 1) => {
  return useGetAllInfinite({
    queryKey: [CINEMA_ENDPOINTS.cinema],
    service: cinemaApi,
    params: { ...params },
    initialPageCount: initialPage,
  });
};

export default useCinemaState;
