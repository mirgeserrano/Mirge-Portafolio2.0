import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";

const { VITE_THEFACTORY_USUARIO, VITE_THEFACTORY_CLAVE } = getEnvVariable();

const ApiTheFatory = () => {
  axios
    .post(
      "/api/Autenticacion",
      {
        usuario: `${VITE_THEFACTORY_USUARIO}`,
        clave: `${VITE_THEFACTORY_CLAVE}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      // Manejar la respuesta de la petición
      console.log(response);
    })
    .catch((error) => {
      // Manejar el error en caso de que ocurra
      console.error(error);
    });
};

//ApiTheFatory();
export default ApiTheFatory;
