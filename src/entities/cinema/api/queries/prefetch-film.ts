import { dehydrate, QueryClient } from '@tanstack/react-query';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';
import cinemaApi from '../cinema.api';

export async function prefetchFilm(documentId: string) {
  const queryClient = new QueryClient();
  const queryKey = [CINEMA_ENDPOINTS.cinema, documentId];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      return cinemaApi.getOne(signal, documentId);
    },
  });

  return dehydrate(queryClient);
}
