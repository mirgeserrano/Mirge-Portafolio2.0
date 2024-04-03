import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";

const { VITE_FIBRE_API_URL } = getEnvVariable();

//fibre

const ApiFibre = async () => {
  const urlFibre = '/api2';
  const dataFibre = {
    token: "Z1pBczJGb3ZrWHM4cVA4cG5pZ2Yxdz09",
    idcliente: "000009",
  };
  try {
    const response = await axios.get(urlFibre, dataFibre);
    console.log(response);
  } catch (error) {
    console.log(error);
    // Maneja el error de la solicitud
  }
};

export default ApiFibre;
