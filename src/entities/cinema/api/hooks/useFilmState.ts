import type { Film, FilmParams } from '@/entities/cinema/types/cinema.types';
import cinemaApi from '@/entities/cinema/api';
import { useGetOne } from '@/shared/api/query/useGetOne';
import { CINEMA_ENDPOINTS } from '@/entities/cinema/api/cinema.endpoints';

const useFilmState = (documentId?: string) => {
  return useGetOne<Film, FilmParams>(documentId ?? null, [CINEMA_ENDPOINTS.cinema], cinemaApi);
};

export default useFilmState;
