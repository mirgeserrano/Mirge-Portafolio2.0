export const formatearFechaTheFactory = (fechaOriginal) => {
  const año = fechaOriginal.getFullYear();
  const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, "0");
  const dia = fechaOriginal.getDate().toString().padStart(2, "0");
  const hora = fechaOriginal.getHours().toString().padStart(2, "0");
  const minuto = fechaOriginal.getMinutes().toString().padStart(2, "0");
  const segundo = fechaOriginal.getSeconds().toString().padStart(2, "0");
  const milisegundo = fechaOriginal
    .getMilliseconds()
    .toString()
    .padStart(3, "0");

  return `${dia}/${mes}/${año}`;
};
