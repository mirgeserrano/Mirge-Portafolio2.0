const convertirFecha = (fechaOriginal) => {
  // Obtener los componentes de la fecha
  const año = fechaOriginal.getFullYear();
  const mes = fechaOriginal.getMonth() + 1; // Los meses en JavaScript se indexan desde 0, por lo que debemos sumar 1
  const dia = fechaOriginal.getDate();
  const horas = fechaOriginal.getHours();
  const minutos = fechaOriginal.getMinutes();
  const segundos = fechaOriginal.getSeconds();
  const milisegundos = fechaOriginal.getMilliseconds();

  // Formatear los componentes de la fecha en el formato deseado
  const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia
    .toString()
    .padStart(2, "0")} ${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}.${milisegundos
    .toString()
    .padStart(3, "0")}`;

  return fechaFormateada;
};

export default convertirFecha