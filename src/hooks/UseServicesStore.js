import axios from "axios";
import getEnvVariable from "../helpers/getEnvVariable";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { getToken, setupAxiosInterceptors } from "../helpers";
import { useDispatch } from "react-redux";

const { VITE_SANIT_API_URL, VITE_SANIT_ID_APP } = getEnvVariable();

export const UseServicesStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  setupAxiosInterceptors(dispatch);
  const pragma = localStorage.getItem("userInfo");
  const pragmaWithoutQuotes = pragma.replace(/"/g, "");

  //obtener un arreglo de servicios
  const getAccountsReceivable = () => {
    return new Promise(async (resolve, reject) => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/services/`,
        headers: {
          Pragma: getToken(),
        },
      };

      try {
        const response = await axios.request(config);
        //  const accountsReceivable = response.data;
        resolve(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  // obtener un servicio
  // const getAccountReceivable = (data) => {
  //   const id = data.id;
  //   return new Promise(async (resolve, reject) => {
  //     let config = {
  //       method: "get",
  //       url: `${VITE_SANIT_API_URL}adm/services/?codserv=${id}`,
  //       headers: {
  //         Pragma: getToken(),
  //       },
  //     };

  //     try {
  //       const response = await axios.request(config);
  //       //  const accountsReceivable = response.data;
  //       resolve(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
    
  // };
  const getAccountReceivable = (data) => {
    const id = data.id;
    const config = {
      method: "get",
      url: `${VITE_SANIT_API_URL}adm/services/?codserv=${id}`,
      headers: {
        Pragma: getToken(),
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error al obtener cuentas por cobrar:", error);
        throw error; // Lanza el error para que el llamante pueda manejarlo
      });
  };

  
//Editar un servicio
  const putAccountReceivable = (data) => {
    const { id } = data;
    console.log(id);
    return new Promise(async (resolve, reject) => {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/services/?codserv=${id}`,
        headers: {
          Pragma: pragmaWithoutQuotes,
          appID: VITE_SANIT_ID_APP,
        },
      };

      console.log(config);
      try {
        const response = await axios.request(config);
        console.log(response.data);
        resolve(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  //borrar un servicio
  const deleteAccountReceivable = (para) => {
    const { id } = para;
    return new Promise(async (resolve, reject) => {
      let data = JSON.stringify({
        appID: VITE_SANIT_ID_APP,
      });
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/services/?codserv=${id}`,
        headers: {
          Pragma: pragmaWithoutQuotes,
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        console.log(response.data);
        resolve(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return {
    getAccountsReceivable,
    getAccountReceivable,
    putAccountReceivable,
    deleteAccountReceivable,
  };
};
