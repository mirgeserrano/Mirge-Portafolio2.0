import axios from "axios";
import {
  fetchCustomerFailure,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from "../redux/features/customerSlice";
import { getEnvVariable, getToken, useSetupAxiosInterceptors  } from "../helpers";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const useCustomerStore = () => {
  const dispatch = useDispatch();
  const { VITE_SANIT_API_URL } = getEnvVariable();
  useSetupAxiosInterceptors(dispatch);

  //*funcion para obtener un cliente
  const getCustomer = (params) => async (dispatch) => {
    const { codclie } = params;
    dispatch(fetchCustomerStart());

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/customers/?CodClie=${codclie}`,
      headers: {
        Pragma: getToken(),
      },
    };

    try {
      const response = await axios.request(config);
      dispatch(fetchCustomerSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch(fetchCustomerFailure());
    }
  };

  //*funcion para obtener Todos los clientes
  const getCustomes = () => {
    return new Promise(async (resolve, reject) => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/customers/`,
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

  //*promesa para eliminar un cliente
  const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (id, { rejectWithValue }) => {
      console.log(id);
      try {
        const config = {
          method: "delete",
          url: `${VITE_SANIT_API_URL}adm/customer/${id}`,
          headers: {
            Pragma: getToken(),
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

  return { getCustomer, getCustomes, deleteCustomer };
};

export default useCustomerStore;
