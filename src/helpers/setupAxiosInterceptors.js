import axios from "axios";
import { resetCustomerFailure } from "../redux/features/customerSlice";
import { resetInvoice } from "../redux/features/invoiceSlice";
import { resetProduct } from "../redux/features/productSlice";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export const setupAxiosInterceptors = (dispatch) => {
  const navigate = useNavigate()
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        console.log("La sesión ha expirado para la solicitud");
        dispatch(
          onLogout(
            "La Sesión ha expirado para la solicitud debe volver a ingresar"
          )
        );
        setTimeout(() => {
          localStorage.clear();
          dispatch(resetCustomerFailure());
          dispatch(resetInvoice());
          dispatch(resetProduct());
        }, 10);
        navigate("/*");
      }
      return Promise.reject(error);
    }
  );
};
