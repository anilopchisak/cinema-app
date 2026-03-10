import apiService from '@/shared/api/service/';
import { type Film, type FilmParams } from '../types/cinema.types';
import { CINEMA_ENDPOINTS } from './cinema.endpoints';

const cinemaApi = apiService<Film, FilmParams>(CINEMA_ENDPOINTS.cinema);

export default cinemaApi;
