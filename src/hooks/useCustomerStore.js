import axios from "axios";
import {
  fetchCustomerFailure,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from "../redux/features/customerSlice";
import { getEnvVariable, setupAxiosInterceptors } from "../helpers";
import { useDispatch } from "react-redux";

export const useCustomerStore = () => {
  const dispach = useDispatch();
  const { VITE_SANIT_API_URL } = getEnvVariable();
  const pragma = localStorage.getItem("userInfo");
  const sinComillas = pragma.replace(/"/g, "");

  setupAxiosInterceptors(dispach);
  
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
      return response.data;
    } catch (error) {
      console.log(error);
       dispatch(fetchCustomerFailure());
  
    }
  };

  return { getCustomer };
};

export default useCustomerStore;
