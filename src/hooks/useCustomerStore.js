import axios from "axios";
import {
  fetchCustomerFailure,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from "../redux/features/customerSlice";
import { getEnvVariable, getToken, setupAxiosInterceptors } from "../helpers";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const useCustomerStore = () => {
  const dispach = useDispatch();
  const { VITE_SANIT_API_URL } = getEnvVariable();
  const pragma = localStorage.getItem("userInfo");
  const sinComillas = pragma.replace(/"/g, "");
  setupAxiosInterceptors(dispach);
  
  //*funcion para obtener cliente
  const getCustomer = (params ) => async (dispatch) => {
    const { codclie } = params;
    console.log(codclie);
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
  
  const getCustomes = () => async (dispatch) => {
    
    dispatch(fetchCustomerStart());

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/customers/`,
      headers: {
        Pragma: sinComillas,
      },
    };

    try {
      const response = await axios.request(config);
      dispatch(fetchCustomerSuccess(response.data));

    console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch(fetchCustomerFailure());
    }
  };
  // const getCustomes = createAsyncThunk(
  //   "services/deleteAccountReceivable",
  //   async ( { rejectWithValue }) => {
  //    console.log(data);
  //     try {
  //       const config = {
  //         method: "get",
  //         url: `${VITE_SANIT_API_URL}adm/customers/`,
  //         headers: {
  //           Pragma: getToken(),
  //         },
          
  //       };
  //       console.log(config);
  //       const response = await axios.request(config);
  //       console.log(response.data);
  //       return response.data;
  //     } catch (error) {
  //       return rejectWithValue(error.response.data);
  //     }
  //   }
  // );

  return { getCustomer, getCustomes };
};

export default useCustomerStore;
