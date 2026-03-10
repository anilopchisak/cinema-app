import { dehydrate, QueryClient } from '@tanstack/react-query';
import cinemaApi from '../cinema.api';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';

export async function prefetchCinema(params?: any) {
  const queryClient = new QueryClient();

  const queryKey = [CINEMA_ENDPOINTS.cinema, params];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: ({ signal }) => cinemaApi.getAll(signal!, params),
  });

  return dehydrate(queryClient);
}
