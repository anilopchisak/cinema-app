import cinemaApi from '../cinema.api';
import { FilmParams } from '../../types/cinema.types';

/**
 * Получает данные одного фильма по его documentId.
 * @param documentId - уникальный идентификатор фильма
 * @returns Promise с данными фильма (включая populate gallery)
 */
export async function getFilm(documentId: string) {
  const params: FilmParams = { populate: ['gallery'] };
  const controller = new AbortController();
  const signal = controller.signal;
  return await cinemaApi.getOne(signal, documentId, params, { revalidate: 60 });
}
