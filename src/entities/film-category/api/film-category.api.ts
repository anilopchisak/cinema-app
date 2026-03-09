import apiService from "@/shared/api/service";
import { FILM_CATEGORY_ENDPOINTS } from "./film-category.endpoints";
import type { FilmCategory } from "../types/film-category.types";

const filmCategoryApi = apiService<FilmCategory, unknown>(
  FILM_CATEGORY_ENDPOINTS.filmCategory,
);

export default filmCategoryApi;
