export function roundToTwoDecimalPlaces(number) {
   const roundedNumber = Math.round(number * 100) / 100;
  return roundedNumber.toFixed(2);
}
