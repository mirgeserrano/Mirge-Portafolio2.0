// export function formatDateString(dateString) {
//   // Parsea la fecha del string proporcionado
//   const date = new Date(dateString);

//   // Función auxiliar para agregar ceros a la izquierda si es necesario
//   const pad = (num, size) => num.toString().padStart(size, "0");

//   // Construye la fecha en formato 'YYYY-MM-DD'
//   const formattedDate = [
//     date.getFullYear(),
//     pad(date.getMonth() + 1, 2), // getMonth() devuelve un valor de 0 a 11
//     pad(date.getDate(), 2),
//   ].join("-");

//   // Construye la hora en formato 'HH:MM:SS.mmm'
//   const formattedTime =
//     [
//       pad(date.getHours(), 2),
//       pad(date.getMinutes(), 2),
//       pad(date.getSeconds(), 2),
//     ].join(":") +
//     "." +
//     pad(date.getMilliseconds(), 3);

//   // Combina ambos formatos
//   return formattedDate + " " + formattedTime;
// }
// import React from 'react'

const formatDateString = (dateString) => {
    // Parsea la fecha del string proporcionado
    const date = new Date(dateString);
   // Función auxiliar para agregar ceros a la izquierda si es necesario
   const pad = (num, size) => num.toString().padStart(size, "0");

   // Construye la fecha en formato 'YYYY-MM-DD'
   const formattedDate = [
     date.getFullYear(),
     pad(date.getMonth() + 1, 2), // getMonth() devuelve un valor de 0 a 11
     pad(date.getDate(), 2),
   ].join("-");
 
   // Construye la hora en formato 'HH:MM:SS.mmm'
   const formattedTime =
     [
       pad(date.getHours(), 2),
       pad(date.getMinutes(), 2),
       pad(date.getSeconds(), 2),
     ].join(":") +
     "." +
     pad(date.getMilliseconds(), 3);
 
   // Combina ambos formatos
   return formattedDate + " " + formattedTime;
}

export default formatDateString