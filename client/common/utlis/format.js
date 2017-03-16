export const formatPrice = (number, precision) => {
  let tempVar;
  const tempPrecision = precision || 2;
  if (number === undefined || number == null || isNaN(number)) {
    return '--';
  }
  if (typeof number === 'string') {
    tempVar = parseFloat(number);
  } else {
    tempVar = number;
  }
  return tempVar.toFixed(tempPrecision).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
