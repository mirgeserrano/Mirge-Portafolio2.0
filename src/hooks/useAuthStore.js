import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";

import {
  ClearErrorMessage,
  onLogout,
  onlogin,
} from "../redux/features/authSlice";
import { useSelector } from "react-redux";
import { resetCustomerFailure } from "../redux/features/customerSlice";
import { resetInvoice } from "../redux/features/invoiceSlice";
import { resetProduct } from "../redux/features/productSlice";

const { VITE_SANIT_API_URL, VITE_SANIT_X_API_KEY, VITE_SANIT_ID_APP } =
  getEnvVariable();

const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLoginWithEmailPassword = (data) => async (dispatch) => {
    const { user, password } = data;

    try {
      const url = `${VITE_SANIT_API_URL}main/login`;
      const username = user;
      const Password = password;
      const credentials = `${username}:${Password}`;
      const authHeader = `Basic ${btoa(credentials)}`;

      const config = {
        headers: {
          Authorization: authHeader,
          "x-api-key": VITE_SANIT_X_API_KEY,
        },
      };

      const requestData = {
        appID: VITE_SANIT_ID_APP,
      };
      
      const response = await axios.post(url, requestData, config);
      console.log(response);
      if (response.headers.pragma) {
        const responseData = response.data;
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.headers.pragma)
        );
        dispatch(onlogin(responseData));
        return responseData;
      } else {
        throw new Error("Inicio de sesión incorrecto");
      }
    } catch (error) {
      //Asi se envian los errores al estado
      dispatch(onLogout("Credenciales Incorrectas"));
      setTimeout(() => {
        dispatch(ClearErrorMessage());
      }, 10);
      throw new Error("Error en la solicitud: " + error.message);
    }
  };

//  const checkAuthToken = async () => {
    
//       try {
//         const { data } = await calendarApi.get("/auth/renew");
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("token-init-date", new Date().getTime());
//         dispatch(onlogin({}));
//       } catch (error) {
//         localStorage.clear();
//         dispatch(onLogout());
//       }
//     };


  const startLogout = () => async (dispatch) => {
    dispatch(onLogout("Adios"));
    setTimeout(() => {
      dispatch(resetCustomerFailure());
      dispatch(resetInvoice());
      dispatch(resetProduct());

    }, 10);
   
  };

  return {
    status,
    user,
    errorMessage,
    startLoginWithEmailPassword,
    startLogout,
  };
};

export default useAuthStore;
