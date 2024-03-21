import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";
import {
  fetchCustomerFailure,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from "../redux/features/customerSlice";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { resetCustomerFailure } from "../redux/features/customerSlice";
import { resetInvoice } from "../redux/features/invoiceSlice";
import { resetProduct } from "../redux/features/productSlice";

const { VITE_SANIT_API_URL } = getEnvVariable();

export const useCustomerStore = () => {
  const pragma = localStorage.getItem("userInfo");
  const sinComillas = pragma.replace(/"/g, "");
  const navigate = useNavigate();

  //*funcion para obtener cliente
  const getCustomer = (params) => async (dispatch) => {
    const { codclie } = params;
    dispatch(fetchCustomerStart());

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/customers/?CodClie=${codclie}`,
      headers: {
        Pragma: sinComillas,
      },
    };

    try {
      const response = await axios.request(config);
      dispatch(fetchCustomerSuccess(response.data));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(
          "La sesión ha expirado para la solicitud debe volver a ingresar"
        );
        dispatch(
          onLogout(
            "La Sesión ha expirado para la solicitud debe volver a ingresar"
          )
        );
        setTimeout(() => {
          dispatch(resetCustomerFailure());
          dispatch(resetInvoice());
          dispatch(resetProduct());
        }, 10);
        navigate("/");
      } else {
        console.log("Error Al cargar el Cliente desde el API:", error.message);
        dispatch(fetchCustomerFailure());
      }
    }
  };

  return { getCustomer };
};

export default useCustomerStore;
