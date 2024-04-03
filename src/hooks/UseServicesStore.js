import axios from "axios";
import getEnvVariable from "../helpers/getEnvVariable";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const { VITE_SANIT_API_URL } = getEnvVariable();

export const UseServicesStore = () => {
  const navigate = useNavigate();
  const pragma = localStorage.getItem("userInfo");
  const pragmaWithoutQuotes = pragma.replace(/"/g, "");

  const getAccountsReceivable = () => {
    return new Promise(async (resolve, reject) => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/services/`,
        headers: {
          Pragma: pragmaWithoutQuotes,
        },
      };

      try {
        const response = await axios.request(config);
      //  const accountsReceivable = response.data;
        resolve(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.log("La sesión ha expirado para la solicitud de servicios");
          onLogout("La sesión ha expirado ");
          navigate("/");
        } else {
          console.log("Error en la solicitud del servicio:", error.message);
        }
        reject(error);
      }
    });
  };

  return {
    getAccountsReceivable,
  };
};