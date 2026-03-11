export const favoritesMapper = (data: any): any => {
  const result = data?.items?.map((item) => ({
    ...item.film,
    isFavorite: true,
  }));
  return result;
};
