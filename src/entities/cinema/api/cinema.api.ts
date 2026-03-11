import apiService from '@/shared/api/service/';
import { type Film, type FilmParams } from '@/entities/cinema/types/cinema.types';
import { CINEMA_ENDPOINTS } from '@/entities/cinema/api/cinema.endpoints';

const cinemaApi = apiService<Film, FilmParams>(CINEMA_ENDPOINTS.cinema, { revalidate: 300 });

export default cinemaApi;
