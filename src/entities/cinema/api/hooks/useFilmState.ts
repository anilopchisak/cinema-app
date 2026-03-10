import type { Film, FilmParams } from '../../types/cinema.types';
import cinemaApi from '..';
import { useGetOne } from '@/shared/api/query/useGetOne';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';

const useFilmState = (documentId?: string) => {
  return useGetOne<Film, FilmParams>(documentId ?? null, [CINEMA_ENDPOINTS.cinema], cinemaApi);
};

export default useFilmState;
