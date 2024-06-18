// export function formatearFechaTheFactory(fechaCompleta) {
//   // Crear un objeto Date a partir de la cadena de fecha completa
//   const fecha = new Date(fechaCompleta);

//   // Obtener los componentes de la fecha y la hora
//   const año = fecha.getFullYear();
//   const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Sumar 1 al mes porque los meses son indexados desde 0
//   const dia = fecha.getDate().toString().padStart(2, "0");
//    let hora = fecha.getHours();
//    const minutos = fecha.getMinutes().toString().padStart(2, "0");
//    const segundos = fecha.getSeconds().toString().padStart(2, "0");
//    let designacion = "am";

//    // Convertir la hora a formato de 12 horas y obtener la designación AM/PM
//    if (hora >= 12) {
//      designacion = "pm";
//      if (hora > 12) {
//        hora -= 12;
//      }
//    }
//    if (hora === 0) {
//      hora = 12;
//    }
  
//     const horaFormateada = hora.toString().padStart(2, "0");
//   // Devolver los componentes formateados como un objeto
//   return {
//     fecha: `${dia}/${mes}/${año}`, // Formato YYYY-MM-DD
//     hora: `${horaFormateada}:${minutos}:${segundos} ${designacion}`,
//   };
// }


const formatearFechaTheFactory = (fechaCompleta) => {
   // Crear un objeto Date a partir de la cadena de fecha completa
   const fecha = new Date(fechaCompleta);

   // Obtener los componentes de la fecha y la hora
   const año = fecha.getFullYear();
   const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Sumar 1 al mes porque los meses son indexados desde 0
   const dia = fecha.getDate().toString().padStart(2, "0");
    let hora = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    const segundos = fecha.getSeconds().toString().padStart(2, "0");
    let designacion = "am";
 
    // Convertir la hora a formato de 12 horas y obtener la designación AM/PM
    if (hora >= 12) {
      designacion = "pm";
      if (hora > 12) {
        hora -= 12;
      }
    }
    if (hora === 0) {
      hora = 12;
    }
   
     const horaFormateada = hora.toString().padStart(2, "0");
   // Devolver los componentes formateados como un objeto
   return {
     fecha: `${dia}/${mes}/${año}`, // Formato YYYY-MM-DD
     hora: `${horaFormateada}:${minutos}:${segundos} ${designacion}`,
   };
}

export default formatearFechaTheFactory