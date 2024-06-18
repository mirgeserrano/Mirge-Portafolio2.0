// export function separarIndiceNumero(cadena) {
//   // Utilizar una expresión regular para separar el índice y el número
//   const match = cadena.match(/([a-zA-Z]+)(\d+)/);

//   // Verificar si se encontró una coincidencia y devolver los resultados
//   if (match && match.length === 3) {
//     const indice = match[1].toUpperCase(); // Obtener el índice (letras)
//     const numero = match[2]; 
//     return { indice, numero };
//   } else {
//     // Si no se encuentra una coincidencia, devolver un objeto vacío
//     return {};
//   }
// }


const separarIndiceNumero = (cadena) => {
  // Utilizar una expresión regular para separar el índice y el número
  const match = cadena.match(/([a-zA-Z]+)(\d+)/);

  // Verificar si se encontró una coincidencia y devolver los resultados
  if (match && match.length === 3) {
    const indice = match[1].toUpperCase(); // Obtener el índice (letras)
    const numero = match[2]; 
    return { indice, numero };
  } else {
    // Si no se encuentra una coincidencia, devolver un objeto vacío
    return {};
  }
}

export default separarIndiceNumero