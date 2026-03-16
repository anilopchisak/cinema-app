/**
 * Очищает объект параметров от пустых (falsy) значений, кроме булевых.
 * Полезно для подготовки query-параметров перед отправкой, чтобы не включать пустые строки, undefined и т.д.
 * @param params - исходный объект параметров
 * @returns Новый объект, содержащий только те поля, у которых значение truthy или является boolean
 */
export const clearEmptyParams = <TParams>(params?: TParams) => {
  let requestParams = {};
  if (params) requestParams = params;

  return Object.fromEntries(
    Object.entries(requestParams).filter(([_, value]) => !!value || typeof value === 'boolean')
  );
};
