import axios from "axios";
import getEnvVariable from "../helpers/getEnvVariable";
import { getToken, setupAxiosInterceptors } from "../helpers";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const useServicesStore = () => {
  const { VITE_SANIT_API_URL, VITE_SANIT_ID_APP } = getEnvVariable();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  setupAxiosInterceptors(dispatch);

  //*obtener un arreglo de servicios
  const getServices = () => {
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
        resolve(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  //!obtener un servicio 
  const getService = async (id) => {
    const codserv = id.id;
    const url = `${VITE_SANIT_API_URL}adm/services?codserv=${codserv}`;
    const config = {
      headers: {
        Pragma: getToken(),
      },
    };

    try {
      // const response = await axios.get(urlFibre, dataFibre);
      const response = await axios.get(url, config);
      
      console.log(response.data);
      //    resolve(response.data);
    } catch (error) {
      console.log(error);
       throw error; 
    }
  };

  //!Editar un servicio
  const putSevices = (data) => {
    const { id } = data;
    console.log(id);
    return new Promise(async (resolve, reject) => {
      let config = {
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/services/?codserv=${id}`,
        headers: {
          Pragma: getToken(),
          appID: VITE_SANIT_ID_APP,
        },
      };

      console.log(config);
      try {
        // const response = await axios.get(urlFibre, dataFibre);
        const response = await axios.get(config);
        console.log(response.data);
        resolve(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  //*borrar un servicio
  //todo Con createAsync Acepta la respuesta de una funcion
  const deleteServices = createAsyncThunk(
    "services/deleteAccountReceivable",
    async (id, { rejectWithValue }) => {
      console.log(id);
      try {
        const { VITE_SANIT_API_URL } = getEnvVariable();
        const config = {
          method: "delete",
          url: `${VITE_SANIT_API_URL}adm/service/?codserv=${id}`,
          headers: {
            Pragma: getToken(),
          },
        };

        const response = await axios.request(config);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
         handleServerError(error, navigate);
     //return rejectWithValue(error.response.data);
      }
    }
  );

  return {
    getServices,
    getService,
    putSevices,
    deleteServices,
  };
};
