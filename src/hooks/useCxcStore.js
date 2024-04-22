import axios from "axios";
import getEnvVariable from "../helpers/getEnvVariable";
import { getToken, setupAxiosInterceptors } from "../helpers";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const useCxcStore = () => {
  const { VITE_SANIT_API_URL, VITE_SANIT_X_API_KEY, VITE_SANIT_ID_APP } = getEnvVariable();
  const dispatch = useDispatch();
  setupAxiosInterceptors(dispatch);

  //*obtener un arreglo de servicios
  const getAccountsReceivable = () => {
    return new Promise(async (resolve, reject) => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/accreceivables/?saldo>0`,
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

  //*Obtengo una cuenta por cobrar
  const getAccountReceivable = async (id) => {
    const codserv = id.id;
    const url = `${VITE_SANIT_API_URL}adm/accreceivables/?saldo>0&id=${codserv}`;
    const config = {
      headers: {
        Pragma: getToken(),
      },
    };
    try {
      const response = await axios.get(url, config);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //!Editar un servicio
  const putAccountReceivable = createAsyncThunk(
    "services/deleteAccountReceivable",
    async (data, { rejectWithValue }) => {
      console.log(data);
      try {
        const config = {
          method: "put",
          url: `${VITE_SANIT_API_URL}adm/accreceivables`,
          headers: {
            "x-api-key": VITE_SANIT_X_API_KEY,
            Pragma: getToken(),
          },
          body: {
            data: data,
          },
        };
        console.log(config);
        const response = await axios.request(config);
        console.log(response.data);
        return response.data;
      } catch (error) {
        // handleServerError(error);
        return rejectWithValue(error.response.data);
      }
    }
  );

  //!borrar un servicio
  //Con createAsync Acepta la respuesta de una funcion
  const deleteAccountReceivable = createAsyncThunk(
    "services/deleteAccountReceivable",
    async (id, { rejectWithValue }) => {
      console.log(id);
      try {
        const config = {
          method: "delete",
          url: `${VITE_SANIT_API_URL}adm/accreceivable/${id}`,
          headers: {
            Pragma: getToken(),
          },
          body: {
            appID: `${VITE_SANIT_ID_APP}`,
          },
        };
        console.log(config);
        const response = await axios.request(config);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    }
  );

  return {
    getAccountsReceivable,
    getAccountReceivable,
    putAccountReceivable,
    deleteAccountReceivable,
  };
};
