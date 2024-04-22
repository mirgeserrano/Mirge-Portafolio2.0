// import axios from "axios";
// import { getEnvVariable } from "../helpers/getEnvVariable";

// const { VITE_FIBRE_API_URL } = getEnvVariable();

// //fibre

// const ApiFibre = async () => {
//     axios
//       .get("http://uplinkfibra.net/api/v1/GetClientsDetails", {
//         data: {
//           token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
//           idcliente: "000009",
//         },
//       })

//       .then((response) => {
//         // Manejar la respuesta de la petición
//            console.log(response);
//       })
//       .catch((error) => {
//         // Manejar el error en caso de que ocurra
//         console.error(error);
//       });
// };

// export default ApiFibre;
// import axios from "axios";
// import { getEnvVariable } from "../helpers/getEnvVariable";

// const { VITE_FIBRE_API_URL } = getEnvVariable();

// const ApiFibre = async () => {
//   let data = JSON.stringify({
//     token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
//     idcliente: "000009",
//   });

//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: "http://uplinkfibra.net/api/v1/GetClientsDetails",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };
  
//     try {
//         const response = await axios.request(config);
//         // Manejar la respuesta de la petición
//       console.log(response);
//     } catch (error) {
//         // Manejar el error en caso de que ocurra
//         console.error(error);
//     }
// };

// export default ApiFibre;

import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";

const { VITE_FIBRE_API_URL } = getEnvVariable();

const ApiFibre = async () => {
  let data = JSON.stringify({
    token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
    idcliente: "000009",
  });

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/apiNew/GetClientsDetails`, // Utilizar la URL base de la API
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    // Manejar la respuesta de la petición
   // console.log("Respuesta exitosa:", response.data);
    return response.data; // Retornar la respuesta si es necesario
  } catch (error) {
    // Manejar el error en caso de que ocurra
    console.error("Error al realizar la solicitud:", error);
    throw error; // Lanzar el error si es necesario
  }
};

export default ApiFibre;
