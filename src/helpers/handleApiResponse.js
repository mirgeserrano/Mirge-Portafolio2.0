const handleApiResponse = (response , apiName) => {
  if (response.status === 200 && response.statusText === "OK") {
    const codigo =
      response.data.codigo || response.data.estado || response.data.status;
    const mensaje =
      response.data.mensaje || response.data.message || response.data.salida;

    if (codigo === '200' || codigo === 0 || codigo ==='exito') {
      console.log(`%cSuccess from ${apiName}: ${mensaje}`, "color: green");
      return response.data; // Devolver el resultado si el código es 200 o 0
    } else {
    
      console.error(`Error from ${apiName}: ${mensaje}`);
      return null; // Salir temprano si hay un error
    } // Devolver el resultado si el código es 200
  } else {
    console.error(`HTTP Error: ${response.status} ${response.statusText}`);
    return null;
  }
}

export default handleApiResponse