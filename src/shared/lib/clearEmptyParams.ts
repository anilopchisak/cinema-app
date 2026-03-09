export const clearEmptyParams = <TParams>(params?: TParams) => {
  let requestParams = {};
  if (params) requestParams = params;

  return Object.fromEntries(
    Object.entries(requestParams).filter(([_, value]) => !!value || typeof value === 'boolean')
  );
};
