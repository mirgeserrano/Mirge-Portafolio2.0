export function roundToTwoDecimalPlaces(number) {
   const roundedNumber = Math.round(number * 100) / 100;
  return roundedNumber.toFixed(2);
}


export function roundToFourDecimalPlaces(number) {
  const roundedNumber = Math.round(number * 100) / 100;
 return roundedNumber.toFixed(4);
}

export function convertirNumero(numeroOriginal) {
  // Separar la letra 'V' del número
  const letra = numeroOriginal.charAt(0); // Debería ser 'V'
  const numero = numeroOriginal.substr(1); // Obtener el número sin la 'V'

  // Agregar ceros a la izquierda para que el número tenga 9 caracteres
  const numeroFormateado = numero.padStart(8, '0');

  // Unir la letra 'V' con el número formateado
  const numeroConvertido = letra + numeroFormateado;

  return numeroConvertido;
}