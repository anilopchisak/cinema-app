import type { Film, FilmParams } from '@/entities/cinema/types/cinema.types';
import cinemaApi from '@/entities/cinema/api';
import { useGetOne } from '@/shared/api/query/useGetOne';
import { CINEMA_ENDPOINTS } from '@/entities/cinema/api/cinema.endpoints';

const useFilmState = (documentId?: string) => {
  const params: FilmParams = { populate: ['gallery'] };
  return useGetOne<Film, FilmParams>(
    documentId ?? null,
    [CINEMA_ENDPOINTS.cinema],
    cinemaApi,
    params
  );
};

export default useFilmState;
