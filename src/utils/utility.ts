export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return (
    typeof value !== 'undefined' &&
    value !== null &&
    value !== '' &&
    value !== undefined
  );
};

export const formatStringAmountToNumber = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.]/g, ''));
};

export const formatPriceToLakhs = (value: number) => {
  const val = Math.abs(value);
  if (val >= 10000000)
    return `${currencySymbolMap.INR}${(value / 10000000).toFixed(2)}Cr`;
  if (val >= 100000)
    return `${currencySymbolMap.INR}${(value / 100000).toFixed(2)}L`;
  if (val >= 1000)
    return `${currencySymbolMap.INR}${(value / 1000).toFixed(2)}K`;
  return `${currencySymbolMap.INR}${value.toFixed(2)}`;
};

export const currencySymbolMap: any = {
  INR: '\u20B9',
};
