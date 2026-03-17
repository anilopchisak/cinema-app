/**
 * Преобразует количество минут в строку формата "Xч Yм" или "Xм", если часы отсутствуют.
 * Если minutes отрицательное или не передано, возвращает "0м".
 * @param minutes - количество минут
 * @returns Отформатированная строка
 */
export const formatMinsToHours = (minutes: number): string => {
  if (!minutes || minutes < 0) return '0м';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}м`;
  }

  if (remainingMinutes === 0) {
    return `${hours}ч`;
  }

  return `${hours}ч ${remainingMinutes}м`;
};
